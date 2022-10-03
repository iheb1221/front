import {Vehicle} from "./vehicleCategory";
import {User} from "./User";

export class Reservation {
  id!: number;
  sum!: number;
  dateRange!: string;
  userId!: User;
  vehicleId!: Vehicle;

  constructor() {
  }
}
