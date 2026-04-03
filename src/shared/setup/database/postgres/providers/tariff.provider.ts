import { DataSource } from 'typeorm';
import { Tariff } from '../../schema/tariff.entity';
import { TARIFF_REPOSITORY } from '../repository.tokens';

export const tariffProvider = {
  provide: TARIFF_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Tariff),
  inject: [DataSource],
};
