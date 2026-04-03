import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'charging_session' })
export class ChargingSession extends BaseEntity {
  // ─── Participants ─────────────────────────────────────────────────────

  // Null for B2C walk-in sessions
  @Column({ type: 'uuid', nullable: true })
  vehicleId?: string;

  // Null for B2C walk-in sessions
  @Column({ type: 'uuid', nullable: true })
  driverId?: string;

  // Null for B2C walk-in sessions
  @Column({ type: 'uuid', nullable: true })
  fleetOwnerId?: string;

  // ─── Location ─────────────────────────────────────────────────────────

  @Column({ type: 'uuid' })
  terminalId: string;

  @Column({ type: 'uuid' })
  stationId: string;

  // ─── Billing ──────────────────────────────────────────────────────────

  @Column({ type: 'uuid', nullable: true })
  tariffId?: string;

  // Energy consumed in kWh
  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  energyConsumed?: number;

  // Total amount billed (₹)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amountCharged?: number;

  // ─── Timing ───────────────────────────────────────────────────────────

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime?: Date;

  // ─── Status ───────────────────────────────────────────────────────────

  // 'ongoing' | 'completed' | 'cancelled'
  @Column({ type: 'varchar', default: 'ongoing' })
  status: string;

  // 'b2b' (fleet) | 'b2c' (walk-in)
  @Column({ type: 'varchar', default: 'b2b' })
  sessionType: string;
}
