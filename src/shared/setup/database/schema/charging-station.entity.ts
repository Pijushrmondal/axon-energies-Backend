import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'charging_station' })
export class ChargingStation extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  // @ManyToMany(() => User, (user) => user.chargingStations)
  // users: User[];
}
