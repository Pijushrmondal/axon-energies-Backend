import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'tariff' })
export class Tariff extends BaseEntity {
  // Human-readable label e.g. 'Standard AC Tariff'
  @Column({ type: 'varchar' })
  name: string;

  // 'per_unit' (₹ per kWh) | 'fixed' (flat session price)
  @Column({ type: 'varchar' })
  tariffType: string;

  // Used when tariffType = 'per_unit'
  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  ratePerUnit?: number;

  // Used when tariffType = 'fixed'
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fixedAmount?: number;

  // Assignment scope — tariff can be tied to a station or a specific terminal
  @Column({ type: 'uuid', nullable: true })
  stationId?: string;

  @Column({ type: 'uuid', nullable: true })
  terminalId?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
