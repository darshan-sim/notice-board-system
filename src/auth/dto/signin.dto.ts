import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    description: 'Username for login',
    example: 'john_doe',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password for login',
    example: 'SecurePass123',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
