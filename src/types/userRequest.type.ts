import { User } from 'src/auth/entities/user.entity';

export interface requestWithUser extends Request {
  user: User;
}
