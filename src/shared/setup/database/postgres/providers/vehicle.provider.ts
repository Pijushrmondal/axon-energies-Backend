import { DataSource } from 'typeorm';
import { Vehicle } from '../../schema/vehicle.entity';
import { VEHICLE_REPOSITORY } from '../repository.tokens';

export const vehicleProvider = {
  provide: VEHICLE_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Vehicle),
  inject: [DataSource],
};
