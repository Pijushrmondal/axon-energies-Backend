import { DataSource } from 'typeorm';
import { Role } from '../../schema/role.entity';
import { ROLE_REPOSITORY } from '../repository.tokens';

export const roleProvider = {
  provide: ROLE_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Role),
  inject: [DataSource],
};
