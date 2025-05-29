import { Inject, Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice as NoticeEntity } from './entity/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticesService {
  constructor(
    @Inject('NOTICE_REPOSITORY')
    private noticeRepository: Repository<NoticeEntity>,
  ) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<NoticeEntity> {
    const notice = this.noticeRepository.create(createNoticeDto);
    return this.noticeRepository.save(notice);
  }

  async findAll(): Promise<NoticeEntity[]> {
    return this.noticeRepository.find();
  }

  async findOne(id: number): Promise<NoticeEntity> {
    return this.noticeRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto) {
    const noticeToUpdate = await this.findOne(id);
    const noticeData = this.noticeRepository.merge(
      noticeToUpdate,
      updateNoticeDto,
    );
    return this.noticeRepository.save(noticeData);
  }

  async remove(id: number) {
    const existingNotice = await this.findOne(id);
    return await this.noticeRepository.remove(existingNotice);
  }
}
