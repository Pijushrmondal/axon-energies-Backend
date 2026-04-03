import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  // ─── Scalar columns ──────────────────────────────────────────────────

  @Column({ type: 'varchar', unique: true })
  userName: string;

  @Column({ type: 'varchar', nullable: true })
  profilePicture?: string;

  @Column({ type: 'varchar' })
  password: string; // bcrypt hash

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  // 'active' | 'inactive' | 'suspended'
  @Column({ type: 'varchar', default: 'active' })
  userStatus: string;

  @Column({ type: 'bigint', nullable: true, unique: true })
  mobileNumber?: number;

  @Column({ type: 'boolean', default: false })
  isLogin: boolean;

  @Column({ type: 'boolean', default: false })
  isFirstTimeLogin: boolean;

  @Column({ type: 'varchar', nullable: true })
  poc?: string;

  @Column({ type: 'varchar', nullable: true })
  userKey?: string;

  @Column({ type: 'float', nullable: true, default: 2.5 })
  tempSettlementPercentage?: number;

  // ─── Password reset ───────────────────────────────────────────────────

  @Column({ type: 'varchar', nullable: true })
  resetToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiration?: Date;

  // ─── OTP (driver charger auth) ────────────────────────────────────────

  @Column({ type: 'varchar', nullable: true })
  resetPasswordOTP?: string; // bcrypt hash

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordOtpExpiration?: Date;

  // ─── Foreign key ─────────────────────────────────────────────────────

  @Column({ type: 'uuid', nullable: true })
  roleId?: string;
}
