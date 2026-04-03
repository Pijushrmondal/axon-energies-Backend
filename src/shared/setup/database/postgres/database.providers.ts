import { userProvider } from './providers/user.provider';
import { roleProvider } from './providers/role.provider';
import { chargingStationProvider } from './providers/charging-station.provider';
import { chargingTerminalProvider } from './providers/charging-terminal.provider';
import { tariffProvider } from './providers/tariff.provider';
import { vehicleProvider } from './providers/vehicle.provider';
import { driverProvider } from './providers/driver.provider';
import { fleetAccountProvider } from './providers/fleet-account.provider';
import { chargingSessionProvider } from './providers/charging-session.provider';
import { paymentProvider } from './providers/payment.provider';
import { bookingProvider } from './providers/booking.provider';
import { supportTicketProvider } from './providers/support-ticket.provider';
import { alertProvider } from './providers/alert.provider';

export const databaseProviders = [
  userProvider,
  roleProvider,
  chargingStationProvider,
  chargingTerminalProvider,
  tariffProvider,
  vehicleProvider,
  driverProvider,
  fleetAccountProvider,
  chargingSessionProvider,
  paymentProvider,
  bookingProvider,
  supportTicketProvider,
  alertProvider,
];
