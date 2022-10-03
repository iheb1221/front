import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EmailRequest} from "../model/EmailRequest";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private authService: AuthService,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  forgotPassword(formValue: any) {
    const request = new EmailRequest(formValue.email, '')
    this.authService.forgotPassword(request).subscribe(
      data => {
      //  let snackBarRef = snackBar.open('Message archived', 'Undo');
        this._snackBar.open('check your email','', {
          duration:3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["custom-style"]
        });
       // confirm("check your email ");
        console.log(data);
      }, (error: HttpErrorResponse) =>{
        console.log("error is ", error);
        this._snackBar.open('check your email','', {
          duration:3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["custom-style"]
        });
            }
    );
  }
}
