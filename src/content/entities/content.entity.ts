import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @CreateDateColumn({ type: 'timestamp' })
  publicationDate: Date;

  @ManyToOne(() => User, (user) => user.contents)
  @JoinColumn()
  author: User;
}
