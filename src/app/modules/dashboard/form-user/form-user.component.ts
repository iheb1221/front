import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from "../service/user.service";
import {User} from "../../../model/User";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email','enabled',
    'phoneNumber', 'city','appUserRole', 'action'];
  dataSource!: MatTableDataSource<any>;
  public users?: User[];
  public editUser?: User;
  public deleteUser?: User;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar,
              private userService: UserService) {
  }


  ngOnInit(): void {
    this.getUsers()
    // console.log(this.editData)
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getUsers();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.users = response;
        console.log(this.users);
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
        this.getUsers();
      }
    })
  }

  onDeleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        (response: void) => {
          console.log(response);
          this._snackBar.open('User deleted successfully','', {
            duration:3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["custom-style"]
          });
          this.getUsers();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this._snackBar.open('Error','', {
            duration:3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["custom-style-"]
          });
        })
  }
}
