import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Vehicle} from "../../../model/vehicleCategory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../dashboard/service/user.service";
import {User} from "../../../model/User";
import {ReservationService} from "../../../service/reservation.service";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Reservation} from "../../../model/Reservation";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        showError: true,
        displayDefaultIndicatorType: false
      }

    }
  ]
})
export class ReservationDialogComponent implements OnInit {
  numberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/];
  cvvMask = [/\d/, /\d/, /\d/];
  dayMask = [/\d/, /\d/]

  completed = false;
  invalidDates: Array<Date> = [];
  sum: any;
  rangeDates!: any;
  minDate: Date;
  myForm!: FormGroup;
  paymentForm!: FormGroup;
  loggedUser!: User;
  range: any;
  currentUser!: number;
  vehId!: any
  priceVeh!: any;
  Diff_jours!: any;
  Diff_temps!: any;
  cardN!: any;
  cardNa: any;
  cardDate: any;
  cardCvv: any;
  firstName: any;
  lastName: any;
  email: any;
  vehicleModel: any;
  vehicleName: any;
  public reservations?: Reservation[];
  reservationData: any;
  resId: any;
  completed1= false;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Vehicle,
              private userService: UserService, private reservationService: ReservationService) {
    // this.loggedUser = sessionStorage.getItem("USER_ID")
    this.minDate = new Date();

  }

  ngOnInit(): void {
    this.sum = this.priceVeh * this.Diff_jours
    this.priceVeh = this.data.price
    this.vehId = this.data.id
    this.vehicleModel = this.data.model
    this.vehicleName = this.data.name

    this.reservationService.getReservations().subscribe(
      data => {
        this.reservations = data
        console.log('111', this.reservations)
      }
    )

    console.log("77--", this.vehId)
    this.currentUser = parseInt(localStorage.getItem("USER_ID") + "");
    console.log("------curent user", this.currentUser)

    this.userService.getUserById(this.currentUser).subscribe((dataUser: User) => {
        this.loggedUser = dataUser;
        this.firstName = this.loggedUser.firstName
        this.lastName = this.loggedUser.lastName
        this.email = this.loggedUser.email
      }, error => {
        console.log(error)
      }
    )
    this.reservationService.getReservationByVehicleId(this.vehId).subscribe(
      data => {
        this.reservationData = data
      }, error => {
        console.log(error)
      }
    )
    console.log(this.reservationData,"222")
    this.minDate = new Date();
    const currentYear = new Date().getFullYear();

    let invalidDate = new Date();
    invalidDate.setDate(this.minDate.getDate() - 1);
    this.invalidDates = [invalidDate];


    this.myForm = this.formBuilder.group({
      id: [null],
      userId: [this.currentUser, Validators.required],
      vehicleId: [this.vehId, Validators.required],
      dateRange: ['', Validators.required],
      price: [this.priceVeh, Validators.required],
      sum: ['', Validators.required]

    })
    this.paymentForm = this.formBuilder.group({
      id: [null],
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      date: ['', Validators.required],
      cvv: ['', Validators.required],
      reservationId: [this.resId, Validators.required],
      // datePay: [this.minDate, Validators.required]
    })
  }

  calculatePrice() {
    console.log(this.rangeDates)
    var nbDays
    this.Diff_temps = this.rangeDates[1].getTime() - this.rangeDates[0].getTime();
    this.Diff_jours = this.Diff_temps / (1000 * 3600 * 24);

    console.log(this.Diff_jours)
    this.sum = this.Diff_jours * this.priceVeh

  }

  send() {
    this.completed = true
    console.log("start", this.myForm.value)
    this.reservationService.addReservation(this.myForm.value).subscribe(
      (data: Reservation) => {
        this.resId = data.id
        console.log("****************",this.resId)
      })
  }


  step2() {
    console.log(this.paymentForm.value)
    this.completed1=true
    // this.reservationService.addPayment(this.paymentForm.value).subscribe(
    //   data => {
    //     console.log(data)
    //   }, error => {
    //     console.log(error)
    //   }
    // )
  }

}
