import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateNoticeDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;
}
