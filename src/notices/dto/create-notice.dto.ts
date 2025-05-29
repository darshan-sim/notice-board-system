import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;
}
