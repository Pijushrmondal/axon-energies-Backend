import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'payment' })
export class Payment extends BaseEntity {
  // Null for B2C payments (no fleet account involved)
  @Column({ type: 'uuid', nullable: true })
  fleetAccountId?: string;

  // Linked session (for deductions and B2C payments)
  @Column({ type: 'uuid', nullable: true })
  chargingSessionId?: string;

  // ─── Amount ───────────────────────────────────────────────────────────

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  // 'top_up' | 'deduction' | 'b2c_payment'
  @Column({ type: 'varchar' })
  type: string;

  // Balance snapshot after this transaction (for ledger display)
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  balanceAfter?: number;

  // ─── Reference ────────────────────────────────────────────────────────

  // Manual reference entered by admin (B2B manual top-up)
  @Column({ type: 'varchar', nullable: true })
  referenceNumber?: string;

  // Gateway transaction ID (B2B / B2C gateway payments)
  @Column({ type: 'varchar', nullable: true })
  gatewayTransactionId?: string;

  // 'pending' | 'success' | 'failed' | 'abandoned'
  @Column({ type: 'varchar', nullable: true })
  gatewayStatus?: string;

  // 'upi' | 'card' | 'net_banking' | 'manual'
  @Column({ type: 'varchar', nullable: true })
  paymentMethod?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;
}
