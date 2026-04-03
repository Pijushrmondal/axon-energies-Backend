import { DataSource } from 'typeorm';
import { FranchiseDetails } from '../../schema/franchise-details.entity';
import { FRANCHISE_DETAILS_REPOSITORY } from '../repository.tokens';

export const franchiseDetailsProvider = {
  provide: FRANCHISE_DETAILS_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(FranchiseDetails),
  inject: [DataSource],
};
