import { DataSource } from 'typeorm';
import { Notice } from './notice.entity';

export const noticeProviders = [
  {
    provide: 'NOTICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Notice),
    inject: ['DATA_SOURCE'],
  },
];
