import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum roles {
  ADMIN = 'admin',
  PUBLISHER = 'publisher',
  LIBRARIAN = 'librarian',
  STAFF = 'staff',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  nickName: string;

  @Column()
  phone: string;

  @Column()
  documentNumber: string;

  @Column({
    type: 'enum',
    enum: roles,
    default: roles.STAFF,
  })
  role: roles;
}
