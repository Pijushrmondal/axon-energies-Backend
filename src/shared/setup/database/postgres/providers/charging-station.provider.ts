import { DataSource } from 'typeorm';
import { ChargingStation } from '../../schema/charging-station.entity';
import { CHARGING_STATION_REPOSITORY } from '../repository.tokens';

export const chargingStationProvider = {
  provide: CHARGING_STATION_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(ChargingStation),
  inject: [DataSource],
};
