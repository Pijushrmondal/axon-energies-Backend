import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'support_ticket' })
export class SupportTicket extends BaseEntity {
  // Fleet owner who submitted the ticket
  @Column({ type: 'uuid' })
  fleetOwnerId: string;

  @Column({ type: 'varchar' })
  subject: string;

  @Column({ type: 'text' })
  description: string;

  // 'open' | 'in_progress' | 'resolved'
  @Column({ type: 'varchar', default: 'open' })
  status: string;

  // Timestamp when Admin marked the ticket as resolved
  @Column({ type: 'timestamp', nullable: true })
  resolvedAt?: Date;
}
