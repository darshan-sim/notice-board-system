import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { DatabaseModule } from 'src/database/database.module';
import { noticeProviders } from './entity/notice.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [NoticesController],
  providers: [NoticesService, ...noticeProviders],
})
export class NoticesModule {}
