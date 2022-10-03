import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private tokenService:TokenStorageService,private router:Router
              ,private _snackBar: MatSnackBar,private messageService:MessageService) { }

  ngOnInit(): void {
  }

  logout() {
   this.tokenService.signOut();
    // this.messageService.add({severity:'success', summary:'logout successful', detail:''});
   this.router.navigate(['login'])
    this._snackBar.open('logout successful','', {
      duration:3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ["custom-style"]
    });
  }
}
