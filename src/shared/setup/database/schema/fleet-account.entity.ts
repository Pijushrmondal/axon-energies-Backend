import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'fleet_account' })
export class FleetAccount extends BaseEntity {
  // One fleet account per fleet owner user (unique)
  @Column({ type: 'uuid', unique: true })
  userId: string;

  // Current available balance (₹)
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  balance: number;

  // Trigger low-balance alert when balance drops below this (₹)
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 500 })
  balanceThreshold: number;
}
