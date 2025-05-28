import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

export class Notice {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date | null;
}

@Injectable()
export class NoticesService {
  private notices: Notice[] = [];

  create(createNoticeDto: CreateNoticeDto) {
    const notice = new Notice();
    notice.id = new Date().getTime().toString();
    notice.title = createNoticeDto.title;
    notice.body = createNoticeDto.body;
    notice.created_at = new Date();
    notice.updated_at = null;

    this.notices.push(notice);
    return notice;
  }

  findAll(): Notice[] {
    return [...this.notices];
  }

  findOne(id: string): Notice | undefined {
    const notice = this.notices.find((notice) => notice.id === id);
    if (!notice) {
      throw new BadRequestException(`Can't find notice with id: ${id}`);
    }
    return notice;
  }

  update(id: string, updateNoticeDto: UpdateNoticeDto) {
    const notice = this.notices.find((notice) => notice.id === id);
    if (!notice) {
      throw new BadRequestException(`Can't find notice with id: ${id}`);
    }
    for (const key of Object.keys(updateNoticeDto)) {
      notice[key] = updateNoticeDto[key];
      notice.updated_at = new Date();
    }
    return notice;
  }

  remove(id: string) {
    const oldLength = this.notices.length;
    this.notices = this.notices.filter((notice) => notice.id !== id);
    const newLength = this.notices.length;
    return oldLength - newLength;
  }
}
