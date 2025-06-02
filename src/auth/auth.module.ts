import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from './entities/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { refreshTokenProvider } from './entities/refresh-token.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, ...refreshTokenProvider],
})
export class AuthModule {}
