import { chargingStationProvider } from './providers/charging-station.provider';
import { franchiseDetailsProvider } from './providers/franchise-details.provider';
import { roleProvider } from './providers/role.provider';
import { subscriptionProvider } from './providers/subscription.provider';
import { tariffProvider } from './providers/tariff.provider';
import { taxProvider } from './providers/tax.provider';
import { userProvider } from './providers/user.provider';

export const databaseProviders = [
  userProvider,
  roleProvider,
  chargingStationProvider,
  franchiseDetailsProvider,
  subscriptionProvider,
  tariffProvider,
  taxProvider,
];
