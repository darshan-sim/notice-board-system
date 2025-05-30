import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/sighup.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
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

    return this.generateUserToken(user.id);
  }

  async generateUserToken(userId: number) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    return {
      accessToken,
    };
  }
}
