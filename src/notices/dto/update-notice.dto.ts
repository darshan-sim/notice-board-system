import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoticeDto {
  @ApiProperty({
    description: 'Updated title of the notice',
    example: 'Updated: Team Meeting Rescheduled',
    required: true,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'Updated content of the notice',
    example:
      'The team meeting has been rescheduled to Monday at 2 PM in Conference Room B.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly body: string;
}
