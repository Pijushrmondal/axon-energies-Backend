import { DataSource } from 'typeorm';
import { Payment } from '../../schema/payment.entity';
import { PAYMENT_REPOSITORY } from '../repository.tokens';

export const paymentProvider = {
  provide: PAYMENT_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Payment),
  inject: [DataSource],
};
