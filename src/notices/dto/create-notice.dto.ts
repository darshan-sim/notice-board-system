import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeDto {
  @ApiProperty({
    description: 'The title of the notice',
    example: 'Team Meeting Announcement',
    required: true,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'The content of the notice',
    example:
      'Monthly team meeting will be held on Friday at 3 PM in Conference Room A.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly body: string;
}
