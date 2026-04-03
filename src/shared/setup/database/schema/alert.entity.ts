import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'alert' })
export class Alert extends BaseEntity {
  // User who should receive this alert
  @Column({ type: 'uuid' })
  userId: string;

  // 'low_balance' | 'session_anomaly' | 'subscription_expiry' | 'system'
  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  // Extra context e.g. { balance: 200, threshold: 500 }
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;
}
