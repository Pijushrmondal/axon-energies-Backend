import { DataSource } from 'typeorm';
import { SupportTicket } from '../../schema/support-ticket.entity';
import { SUPPORT_TICKET_REPOSITORY } from '../repository.tokens';

export const supportTicketProvider = {
  provide: SUPPORT_TICKET_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(SupportTicket),
  inject: [DataSource],
};
