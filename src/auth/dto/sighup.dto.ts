import { IsEnum, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { ROLE } from '../entities/user.entity';

export class SignupDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long and include at least one letter and one number.',
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLE)
  role: ROLE;
}
