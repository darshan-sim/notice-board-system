import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, nullable: false })
  title: string;
  @Column({ type: 'text', nullable: false })
  body: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;
  @Column({
    type: 'timestamp',
  })
  updated_at: Date | null;
}
