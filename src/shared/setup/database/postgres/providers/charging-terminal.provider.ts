import { DataSource } from 'typeorm';
import { ChargingTerminal } from '../../schema/charging-terminal.entity';
import { CHARGING_TERMINAL_REPOSITORY } from '../repository.tokens';

export const chargingTerminalProvider = {
  provide: CHARGING_TERMINAL_REPOSITORY,
  useFactory: (ds: DataSource) => ds.getRepository(ChargingTerminal),
  inject: [DataSource],
};
