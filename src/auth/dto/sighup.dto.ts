import { IsEnum, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '../entities/user.entity';

export class SignupDto {
  @ApiProperty({
    description: 'Username for registration',
    example: 'john_doe',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password for registration',
    example: 'SecurePass123',
    required: true,
    minLength: 8,
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long and include at least one letter and one number.',
  })
  password: string;

  @ApiProperty({
    description: 'User role',
    enum: ROLE,
    example: 'USER',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ROLE)
  role: ROLE;
}
