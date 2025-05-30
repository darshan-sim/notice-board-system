import { Module } from '@nestjs/common';
import { NoticesModule } from './notices/notices.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configuration: ConfigService) => ({
        secret: configuration.get<string>('jwt.secret'),
      }),
      global: true,
    }),
    NoticesModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
