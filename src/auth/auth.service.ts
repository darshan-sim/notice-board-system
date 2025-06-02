import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/sighup.dto';
import { MoreThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { uuid } from 'uuidv4';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('REFRESH_TOKEN_REPOSITORY')
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signup(signupData: SignupDto): Promise<User> {
    const { username, role, password } = signupData;

    const usernameInUse = await this.userRepository.findOneBy({ username });
    if (usernameInUse) {
      throw new BadRequestException('username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      role,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async signin(signinData: SigninDto) {
    const { username, password } = signinData;
    //todo: find the user
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credential');
    }
    //todo: compare entered password with existing password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    //todo: Generate JWT token
    return this.generateUserTokens(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const userRefreshToken = await this.refreshTokenRepository.findOne({
      where: {
        token: refreshTokenDto.refreshToken,
        expiryData: MoreThan(new Date()),
        user: {
          id: refreshTokenDto.userid
        }

      },
      relations: ['user'],
    });
    if (!userRefreshToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    await this.refreshTokenRepository.delete(userRefreshToken.id)
    return await this.generateUserTokens(userRefreshToken.user);
  }

  async generateUserTokens(user: User) {
    const accessToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '1h' },
    );
    const refreshToken = uuid();
    const expiryData = new Date();
    expiryData.setDate(expiryData.getDate() + 3);

    const usersRefreshToken = this.refreshTokenRepository.create({
      token: refreshToken,
      user,
      expiryData,
    });
    await this.refreshTokenRepository.save(usersRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
