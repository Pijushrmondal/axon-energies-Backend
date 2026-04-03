import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ChargingStation } from './charging-station.entity';
import { FranchiseDetails } from './franchise-details.entity';
import { Role } from './role.entity';
import { Subscription } from './subscription.entity';
import { Tariff } from './tariff.entity';
import { Tax } from './tax.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  // ─── Scalar columns ──────────────────────────────────────────────────

  @Column({ type: 'varchar', unique: true })
  userName: string;

  @Column({ type: 'varchar', nullable: true })
  profilePicture?: string;

  @Column({ type: 'varchar' })
  password: string; // hash password

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'varchar', default: 'active' })
  userStatus: string;

  @Column({ type: 'bigint', nullable: true, unique: true })
  mobileNumber?: number;

  @Column({ type: 'varchar', nullable: true })
  resetToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiration?: Date;

  @Column({ type: 'varchar', nullable: true })
  resetPasswordOTP?: string; // hash otp

  @Column({ type: 'boolean', default: false })
  isLogin: boolean;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordOtpExpiration?: Date;

  @Column({ type: 'boolean', default: false })
  isFirstTimeLogin: boolean;

  @Column({ type: 'varchar', nullable: true })
  poc?: string;

  @Column({ type: 'varchar', nullable: true })
  userKey?: string;

  @Column({ type: 'float', nullable: true, default: 2.5 })
  tempSettlementPercentage?: number;

  // ─── Foreign key ─────────────────────────────────────────────────────

  @Column({ type: 'uuid' })
  roleId: string;

  // ─── Relations ───────────────────────────────────────────────────────

  // @ManyToOne(() => Role, (role) => role.users, { eager: false })
  // @JoinColumn()
  // role: Role;

  // @OneToMany(() => Subscription, (sub) => sub.user, { cascade: true })
  // subscriptions: Subscription[];

  // @OneToOne(() => FranchiseDetails, (fd) => fd.user, { cascade: true })
  // franchiseDetails: FranchiseDetails;

  // @OneToOne(() => Tax, (tax) => tax.user, { cascade: true })
  // tax: Tax;

  // @OneToOne(() => Tariff, (tariff) => tariff.user, { cascade: true })
  // tariff: Tariff;

  // @ManyToMany(() => ChargingStation, (cs) => cs.users)
  // @JoinTable({
  //   name: 'user_station',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: {
  //     name: 'charging_station_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // chargingStations: ChargingStation[];
}
