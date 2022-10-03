import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {AuthService} from "../service/auth.service";
import {TokenStorageService} from "../service/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PasswordDialogComponent} from "../password-dialog/password-dialog.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  registerForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private tokenStorage: TokenStorageService, private _snackBar: MatSnackBar, public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100)
        ]]
    });
  }


  onLogin(loginData: any): void {
    const log = {...loginData}
    this.isLoggedIn = true;
    this.authService.login(log).subscribe(
      data => {
        if (data.roles[0] == 'USER') {
        console.log(data)
          console.log(data.token)
        this.tokenStorage.saveTokenUser(data.token);
        localStorage.setItem("ROLE_USER", data.roles[0])
        localStorage.setItem("USER_ID", data.id);
          this.isLoggedIn = false;
          this.router.navigate(['/dash/vehicles'])
          this._snackBar.open('login successful', '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["custom-style"]
          });
        } else {
          this.tokenStorage.saveToken(data.token);
          localStorage.setItem("ROLE_ADMIN", data.roles[0])
          localStorage.setItem("ADMIN_ID", data.id);
          this.isLoggedIn = false;
          this.isLoginFailed = false;
          this.router.navigate(['/dashboard/statistic'])
          this._snackBar.open('login successful', '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["custom-style"]
          });

        }
        // this.messageService.add({severity:'success', summary:'login successful', detail:''});

      },
      err => {
        console.log(err)
        this.isLoginFailed = true;
        this.isLoggedIn = false;
        this.errorMessage = 'email and /or password is incorrect ';
        console.log("no")
      }
    );
  }

  navigateTo(url: string): void {
    this.router.navigate(['/', url])
  }


  openDialog() {
    this.dialog.open(PasswordDialogComponent, {
      width: '40%'
    })
  }
}
