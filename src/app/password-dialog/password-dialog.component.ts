import { Component, OnInit } from '@angular/core';
import {EmailRequest} from "../model/EmailRequest";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  myForm!:FormGroup;
  constructor(private authService: AuthService,private _snackBar: MatSnackBar,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]})
  }


  forgotPassword(formValue: any) {
    const request = new EmailRequest(formValue.email, '')
    this.authService.forgotPassword(request).subscribe(
      data => {
        //  let snackBarRef = snackBar.open('Message archived', 'Undo');
        this._snackBar.open('check your email','', {
          duration:4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["custom-style"]
        });
        // confirm("check your email ");
        console.log(data);
      }, (error: HttpErrorResponse) =>{
        console.log("error is ", error);
        this._snackBar.open('check --- email','', {
          duration:3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["custom-style"]
        });
      }
    );
  }

}
