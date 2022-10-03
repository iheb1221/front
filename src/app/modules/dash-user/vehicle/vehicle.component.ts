import {Component, OnInit} from '@angular/core';
import {Vehicle} from "../../../model/vehicleCategory";
import {ReservationDialogComponent} from "../reservation-dialog/reservation-dialog.component";
import {DialogConfirmComponent} from "../../../dialog-confirm/dialog-confirm.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {VehicleService} from "../../dashboard/service/vehicle.service";
import {DomSanitizer} from "@angular/platform-browser";
import {TokenStorageService} from "../../../service/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Options} from "@angular-slider/ngx-slider";
import {CustomFile} from "../../../model/CustomFile";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicles!: Vehicle[];
  disabled = false;
  file: any;
  value: number = 7;
  highValue: number = 32;
  options: Options = {
    floor: 7,
    ceil: 32,
    showTicks: true
  };
  isLogged = false;

  constructor(private router: Router, public dialog: MatDialog, private service: VehicleService,
              private sanitizer: DomSanitizer, private tokenService: TokenStorageService
    , private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log("ng on init")
    this.getVehicles()
    // console.log(this.getVehicles());
    let token = localStorage.getItem('auth-user')
    if (token) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  model = new FormControl();
  models: string[] = [
    'Audi', 'BMW', 'Citroen', 'Fiat', 'Ford', 'Honda', 'Hyundai',
    'Jeep', 'Kia', 'Mazda', 'Mercedes',
    'Mitsubishi', 'Nissan', 'Opel', 'Toyota'];
  volume = new FormControl();
  volumes: string[] = ['2', '5', '7']
  energy = new FormControl();
  energies: string[] = ['Essence', 'Diesel']
  gearBox = new FormControl();
  gearBoxs: string[] = ['Automatic', 'Manual']

  reservation(car: Vehicle) {
    let token = localStorage.getItem('auth-user')
    if (token) {
      this.dialog.open(ReservationDialogComponent, {
        width: '40%',
        data: car
      })
    } else {
      this.dialog.open(DialogConfirmComponent, {
        width: '40',
        height: '140',
        data: car
      })
    }
  }

  public getVehicles(): void {
    this.service.getVehicles().subscribe(
      (response: Vehicle[]) => {
        console.log("get vec", response)
        this.vehicles = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getSrcFromFile(customFile: CustomFile) {
    console.log("--------------", customFile)
    let uint8Array = new Uint8Array(atob(customFile.data)
      .split("")
      .map(char => char.charCodeAt(0)));
    let dwn = new Blob([uint8Array])
    console.log(dwn)
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }

  searchByModel(key: string): void {
    console.log(key)
    const results: Vehicle[] = [];
    for (const vehicle of this.vehicles) {
      if (vehicle.model.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(vehicle);
      }
    }
    this.vehicles = results;
    if (results.length === 0 || !key) {
      console.log("seqch by model")

      this.getVehicles();
    }
  }

  searchByVolume(key: string): void {
    console.log(key)
    const results: Vehicle[] = [];
    for (const vehicle of this.vehicles) {
      if (vehicle.volumeVeh.toString().toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(vehicle);
      }
    }
    this.vehicles = results;
    if (results.length === 0 || !key) {
      this.getVehicles();
      console.log("s by volume")

    }
  }

  searchByEnergy(key: string): void {
    console.log(key)
    const results: Vehicle[] = [];
    for (const vehicle of this.vehicles) {
      if (vehicle.energy.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(vehicle);
      }
    }
    this.vehicles = results;
    if (results.length === 0 || !key) {
      this.getVehicles();
      console.log("energy")

    }
  }

  searchByGearBox(key: string): void {
    console.log(key)
    const results: Vehicle[] = [];
    for (const vehicle of this.vehicles) {
      if (vehicle.gearBox.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(vehicle);
      }
    }
    this.vehicles = results;
    if (results.length === 0 || !key) {
      this.getVehicles();
      console.log("gear box")

    }
  }

  filterByPrice(value: any): void {
    this.service.getVehicles().subscribe(res => {
      if (res) {
        this.vehicles = res.filter(vehicle => vehicle.price >= value.value && vehicle.price <= value.highValue);
      }
    })
  }

  addCategory(newCat: HTMLInputElement) {
    console.log(newCat)
  }
}
