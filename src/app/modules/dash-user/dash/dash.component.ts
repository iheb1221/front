import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../dashboard/service/vehicle.service";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {TokenStorageService} from "../../../service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isLogged = false;

  constructor(private router: Router, public dialog: MatDialog, private service: VehicleService,
              private sanitizer: DomSanitizer, private tokenService: TokenStorageService
    , private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('auth-user')
    if (token) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


  filtreByprice(price: number): void {
    console.log(price)

  }


  addCategory(newCat: HTMLInputElement) {
    console.log(newCat)
  }


  logout() {
    this.tokenService.signOutUser();
    // this.messageService.add({severity:'success', summary:'logout successful', detail:''});
    this.router.navigate(['login'])
    this._snackBar.open('logout successful', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ["custom-style"]
    });
  }

  navigateTo() {
    this.router.navigate(['setting'])
  }
}

