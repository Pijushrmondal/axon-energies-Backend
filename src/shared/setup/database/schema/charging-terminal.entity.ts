import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'charging_terminal' })
export class ChargingTerminal extends BaseEntity {
  // Parent charging station
  @Column({ type: 'uuid' })
  stationId: string;

  // Physical charger identifier (unique per terminal)
  @Column({ type: 'varchar', unique: true })
  terminalCode: string;

  // 'AC' | 'DC'
  @Column({ type: 'varchar' })
  chargerType: string;

  // Output power in kW
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  powerRating?: number;

  // 'active' | 'inactive' | 'maintenance'
  @Column({ type: 'varchar', default: 'active' })
  status: string;

  // ─── Subscription ─────────────────────────────────────────────────────

  @Column({ type: 'varchar', nullable: true })
  subscriptionPlan?: string;

  @Column({ type: 'timestamp', nullable: true })
  subscriptionStartDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  subscriptionEndDate?: Date;
}
