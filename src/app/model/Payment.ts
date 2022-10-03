import {Reservation} from "./Reservation";

export class Payment {
  paymentId!: number;
  cardName!: string;
  cardNumber!: string;
  date!: string;
  cvv!: string;
  datePay!: Date;
  reservationId!: Reservation

}
