import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'vehicle' })
export class Vehicle extends BaseEntity {
  // Fleet owner who owns this vehicle
  @Column({ type: 'uuid' })
  fleetOwnerId: string;

  // e.g. 'MH12AB1234'
  @Column({ type: 'varchar', unique: true })
  registrationNumber: string;

  // '2W' | '3W' | '4W' | 'Bus'
  @Column({ type: 'varchar' })
  vehicleType: string;

  // 'CCS2' | 'CHAdeMO' | 'Type2' | 'AC'
  @Column({ type: 'varchar' })
  chargingSocket: string;

  // Battery capacity in kWh
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  energyCapacity?: number;

  // 'active' | 'archived'
  @Column({ type: 'varchar', default: 'active' })
  status: string;
}
