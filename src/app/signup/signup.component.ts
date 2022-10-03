import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {LoadingSpinner} from "../shared/loading-spinner/loading-spinner";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {User} from '../model/User';

interface city {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoaded = false;
  error: string | undefined;
  myForm !: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              private router: Router, private dialog: MatDialog, private _snackBar: MatSnackBar) {
  }


  openDialog() {
    this.dialog.open(LoadingSpinner);
  }

  onSignup(user: User) {
    this.authService.addUser(user)
      .subscribe(
        response => {
          console.log(response)
          let res = this._snackBar.open('succeed check your email please ', '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["custom-style"]
          });
          if (res) {
            this.router.navigate(['/login'])
          }
        },
        err => {
          this.isLoaded = true;
          let res = this._snackBar.open('succeed check your email please ', '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["custom-style"]
          });
          if (res) {
            this.router.navigate(['login'])
          }
          // this.error = 'An error occurred !';
          console.log('hmm', err.message)
        }
      )

  }


  cities: city[] = [
    {value: "beja", viewValue: 'Beja'},
    {value: "ariana", viewValue: 'Ariana'},
    {value: "bizerte", viewValue: 'Bizerte'},
    {value: "tunis", viewValue: 'Tunis'},
    {value: "nabel", viewValue: 'Nabel'},
    {value: "mahdia", viewValue: 'Mahdia'},
    {value: "ben arous", viewValue: 'Ben Arous'},
    {value: "manouba", viewValue: 'Manouba'},
    {value: "jendouba", viewValue: 'Jendouba'},
    {value: "kef", viewValue: 'Le kef'},
    {value: " siliana", viewValue: 'Siliana'},
    {value: "kasserine", viewValue: 'Kasserine'},
    {value: "sidi Bouzid", viewValue: 'Sidi Bouzid'},
    {value: "gafsa", viewValue: 'Gafsa'},
    {value: "tozeur", viewValue: 'Tozeur'},
    {value: "kébili", viewValue: 'Kébili'},
    {value: "Tataouine", viewValue: 'Tataouine'},
    {value: "Gabès", viewValue: 'Gabès'},
    {value: "Kairouan", viewValue: 'Kairouan'},
    {value: "Monastir", viewValue: 'Monastir'},
    {value: "Sfax", viewValue: 'Sfax'},
    {value: "Sousse", viewValue: 'Sousse'},
    {value: "Zaghouan", viewValue: 'Zaghouan'},
    {value: "Médenine", viewValue: 'Médenine'}
  ];

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: [Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{8,8}")]],
      city: ['', Validators.required]
    });
  }
}
