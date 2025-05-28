import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoticeDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  @IsNotEmpty()
  body: string;
}
