import {CustomFile} from "./CustomFile";

export class Vehicle {
  id!: number;
  model!: string;
  name!: string;
  ranking!: string;
  active!: boolean;
  volumeVeh!: number;
  energy!: string;
  price!: number;
  gearBox!: string;
  description!: string;
  picture!: CustomFile;

  constructor() {

  }
}
