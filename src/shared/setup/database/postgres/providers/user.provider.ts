import { DataSource } from 'typeorm';
import { User } from '../../schema/user.entity';
import { USER_REPOSITORY } from '../repository.tokens';

export const userProvider = {
  provide: USER_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(User),
  inject: [DataSource],
};
