import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'charging_station' })
export class ChargingStation extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  // GPS coordinates
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude?: number;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'varchar', nullable: true })
  state?: string;

  // 'active' | 'suspended'
  @Column({ type: 'varchar', default: 'active' })
  status: string;

  // Admin user who created this station
  @Column({ type: 'uuid', nullable: true })
  createdBy?: string;
}
