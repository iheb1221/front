import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogVehicleComponent} from "../dialog-vehicle/dialog-vehicle.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Vehicle} from "../../../model/vehicleCategory";
import {VehicleService} from "../service/vehicle.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = ['model','name', 'ranking', 'active', 'volume', 'energy',
    'price', 'gearBox', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;
  public vehicles?: Vehicle[];
  public editVehicle?: Vehicle;
  public deleteVehicle?: Vehicle;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private service: VehicleService) {
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(DialogVehicleComponent, {
      width: '40%'
    })
  }

  public getVehicles(): void {
    this.service.getVehicles().subscribe(
      (response: Vehicle[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.vehicles = response;
        console.log(this.vehicles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateVehicle(row: any): void {
    this.dialog.open(DialogVehicleComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Update') {
        this.getVehicles();
      }
    })
  }

  onDeleteVehicle(id: number) {
    this.service.deleteVehicle(id)
      .subscribe(
        (response: void) => {
          console.log(response);
          alert("Vehicle deleted successfully")
          this.getVehicles();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert("error");
        })
  }
}
