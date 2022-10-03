import {Component, OnInit} from '@angular/core';
import {PasswordRequest} from "../model/PasswordRequest";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-confirmation-password',
  templateUrl: './confirmation-password.component.html',
  styleUrls: ['./confirmation-password.component.css']
})
export class ConfirmationPasswordComponent implements OnInit {
  errorMessage = '';
  isLoginFailed = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  myForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router,
              private _snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required,],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100)
        ]]
    })
  }

  forgotPassword(form: any): void {
    console.log(form)
    const request = new PasswordRequest(form.email, form.code, form.password);
    this.authService.resetPassword(request).subscribe(
      data => {
        console.log(data)
        let res = this._snackBar.open('Password successfully changed', 'ok', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["custom-style"]
        });
        //confirm("Password successfully changed")
        if (res) {
          this.router.navigate(['/login'])
        }
      }, error => {
        // this.isLoginFailed = true;
        console.log(error);
        let res = this._snackBar.open('Password successfully changed', 'ok', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ["custom-style"]
        });
        if (res) {
          this.router.navigate(['/login'])
        }
      }
    )

  }

  navigate() {
    this.router.navigate(['login'])
  }
}
