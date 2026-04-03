import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'booking' })
export class Booking extends BaseEntity {
  // Fleet owner making the booking
  @Column({ type: 'uuid' })
  fleetOwnerId: string;

  // Target charging station
  @Column({ type: 'uuid' })
  stationId: string;

  // Specific terminal (optional — can be any terminal at the station)
  @Column({ type: 'uuid', nullable: true })
  terminalId?: string;

  // Vehicle planned for this session
  @Column({ type: 'uuid', nullable: true })
  vehicleId?: string;

  // Scheduled start time of the charging slot
  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  // Duration of the reserved slot in minutes
  @Column({ type: 'int', default: 60 })
  durationMinutes: number;

  // 'confirmed' | 'cancelled' | 'completed'
  @Column({ type: 'varchar', default: 'confirmed' })
  status: string;
}
