import { DataSource } from 'typeorm';
import { FleetAccount } from '../../schema/fleet-account.entity';
import { FLEET_ACCOUNT_REPOSITORY } from '../repository.tokens';

export const fleetAccountProvider = {
  provide: FLEET_ACCOUNT_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(FleetAccount),
  inject: [DataSource],
};
