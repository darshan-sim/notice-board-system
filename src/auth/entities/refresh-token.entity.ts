import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('refresh-tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({unique: true})
  token: string;

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamp' })
  expiryData: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
