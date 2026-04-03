import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  // @OneToMany(() => User, (user) => user.role)
  // users: User[];
}
