import { DataSource } from 'typeorm';
import { ChargingSession } from '../../schema/charging-session.entity';
import { CHARGING_SESSION_REPOSITORY } from '../repository.tokens';

export const chargingSessionProvider = {
  provide: CHARGING_SESSION_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(ChargingSession),
  inject: [DataSource],
};
