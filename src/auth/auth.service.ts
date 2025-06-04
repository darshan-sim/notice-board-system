import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/sighup.dto';
import { MoreThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('REFRESH_TOKEN_REPOSITORY')
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signup(signupData: SignupDto): Promise<boolean> {
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

    if (await this.userRepository.save(user)) {
      return true;
    } else {
      throw new InternalServerErrorException('Unable to signin user');
    }
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
        expiryDate: MoreThan(new Date()),
        user: {
          id: refreshTokenDto.userid,
        },
      },
      relations: ['user'],
    });
    if (!userRefreshToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // await this.refreshTokenRepository.delete(userRefreshToken.id);
    return await this.generateUserTokens(userRefreshToken.user);
  }

  async generateUserTokens(user: User) {
    const accessToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '1h' },
    );
    const refreshToken = uuidv4();
    const newExpiryDate = new Date();
    newExpiryDate.setDate(newExpiryDate.getDate() + 3);

    let usersRefreshToken = await this.refreshTokenRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (usersRefreshToken) {
      usersRefreshToken.token = refreshToken;
      usersRefreshToken.expiryDate = newExpiryDate;
    } else {
      // await this.refreshTokenRepository.delete({ user: { id: user.id } });
      usersRefreshToken = this.refreshTokenRepository.create({
        token: refreshToken,
        user: user,
        expiryDate: newExpiryDate,
      });
    }

    await this.refreshTokenRepository.save(usersRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
