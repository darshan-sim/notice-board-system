import { Module } from '@nestjs/common';
import { NoticesModule } from './notices/notices.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [NoticesModule, DatabaseModule],
})
export class AppModule {}
