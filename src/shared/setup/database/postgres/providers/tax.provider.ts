import { DataSource } from 'typeorm';
import { Tax } from '../../schema/tax.entity';
import { TAX_REPOSITORY } from '../repository.tokens';

export const taxProvider = {
  provide: TAX_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Tax),
  inject: [DataSource],
};
