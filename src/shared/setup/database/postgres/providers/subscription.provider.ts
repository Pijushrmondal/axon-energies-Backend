import { DataSource } from 'typeorm';
import { Subscription } from '../../schema/subscription.entity';
import { SUBSCRIPTION_REPOSITORY } from '../repository.tokens';

export const subscriptionProvider = {
  provide: SUBSCRIPTION_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Subscription),
  inject: [DataSource],
};
