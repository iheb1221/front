import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from "../../../service/reservation.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {Vehicle} from "../../../model/vehicleCategory";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  reservationByUserId: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  displayedColumns: string[] = ['index', 'name', 'car_model', 'reservationPeriod', 'reservationCost',
    'action'];
  dataSource!: MatTableDataSource<any>;
  public vehicles?: Vehicle[];
  public editVehicle?: Vehicle;
  public deleteVehicle?: Vehicle;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private resService: ReservationService, private _snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.getReservations()
  }

  getReservations() {
    this.resService
      .getReservationByUserId(localStorage.getItem("USER_ID"))
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.reservationByUserId = data
        console.log(this.reservationByUserId)

      });
  }

  onCancelReservation(id: any) {
    console.log(id)
    this.resService.deleteReservation(id).subscribe(data => {
      this._snackBar.open('Done', '', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ["custom-style"]
      });
      this.router.navigate(['/vehicles'])
    }, error => {
      console.log(error.error)
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
