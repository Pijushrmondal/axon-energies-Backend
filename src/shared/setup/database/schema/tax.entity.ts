import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'tax' })
export class Tax extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  // @OneToOne(() => User, (user) => user.tax)
  // @JoinColumn()
  // user: User;
}
