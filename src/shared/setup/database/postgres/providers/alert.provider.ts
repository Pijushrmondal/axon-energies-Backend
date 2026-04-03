import { DataSource } from 'typeorm';
import { Alert } from '../../schema/alert.entity';
import { ALERT_REPOSITORY } from '../repository.tokens';

export const alertProvider = {
  provide: ALERT_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Alert),
  inject: [DataSource],
};
