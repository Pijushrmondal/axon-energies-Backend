import { DataSource } from 'typeorm';
import { Driver } from '../../schema/driver.entity';
import { DRIVER_REPOSITORY } from '../repository.tokens';

export const driverProvider = {
  provide: DRIVER_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Driver),
  inject: [DataSource],
};
