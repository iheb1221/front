import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Reservation} from "../../../model/Reservation";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ReservationService} from "../service/reservation.service";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'vehicle_model', 'vehicle_name',
    'date_range', 'sum'];
  dataSource!: MatTableDataSource<any>;
  public reservations?: Reservation[];
  public editReservation?: Reservation;
  public deleteReservation?: Reservation;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private resService: ReservationService) {
  }

  ngOnInit(): void {
    this.getReservation();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getReservation(): void {
    this.resService.getReservations().subscribe(
      (response: Reservation[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.reservations = response;
        console.log("//////////", this.reservations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateUser(row: any): void {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Update') {
        this.getReservation();
      }
    })
  }

  onDeleteUser(id: number) {
    this.resService.deleteReservation(id)
      .subscribe({
        next: (res) => {
          alert("user deleted successfully")
          this.getReservation();
          this.getReservation();
          console.log(res)
        },
        error: () => {
          alert("error")
        }
      })
  }
}
