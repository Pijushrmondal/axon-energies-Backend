import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'driver' })
export class Driver extends BaseEntity {
  // Fleet owner who registered this driver
  @Column({ type: 'uuid' })
  fleetOwnerId: string;

  @Column({ type: 'varchar' })
  name: string;

  // Used as the identifier for OTP dispatch at the charger
  @Column({ type: 'varchar', unique: true })
  phoneNumber: string;

  // 'active' | 'archived'
  @Column({ type: 'varchar', default: 'active' })
  status: string;

  // Bcrypt-hashed OTP for charger session authorization
  @Column({ type: 'varchar', nullable: true })
  otpHash?: string;

  @Column({ type: 'timestamp', nullable: true })
  otpExpiry?: Date;
}
