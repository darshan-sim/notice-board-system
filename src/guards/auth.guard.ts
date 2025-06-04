import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/auth/entities/user.entity';
import { UserContext } from 'src/types/requestUser.type';
import { requestWithUser } from 'src/types/userRequest.type';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: requestWithUser = context
      .switchToHttp()
      .getRequest<requestWithUser>();
    const accessToken = request.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('No access token provided');
    }
    try {
      const payload = this.jwtService.verify<UserContext>(accessToken);
      const user = await this.userRepository.findOneBy({ id: payload.userId });
      if (!user) {
        throw new UnauthorizedException();
      }
      request.user = user;
      console.log({ user });
      console.log({ request: request.user });
      return true;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
