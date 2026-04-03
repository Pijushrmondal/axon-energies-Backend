import { DataSource } from 'typeorm';
import { Booking } from '../../schema/booking.entity';
import { BOOKING_REPOSITORY } from '../repository.tokens';

export const bookingProvider = {
  provide: BOOKING_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(Booking),
  inject: [DataSource],
};
