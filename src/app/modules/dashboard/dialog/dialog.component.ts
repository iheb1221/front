import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {User} from "../../../model/User";


interface city {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  isLoaded = false;
  registerForm !: FormGroup;
  actionBtn: string = "save";
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private authService: UserService, private router: Router, private formBuilder: FormBuilder
    , private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public onUpdateUser: any,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{8,8}")]],
      city: ['', Validators.required],
      enabled: ['', Validators.required],
      appUserRole: ['', Validators.required]
    });
    if (this.onUpdateUser) {
      this.actionBtn = "Update";
      this.registerForm.controls['id'].setValue(this.onUpdateUser.id);
      this.registerForm.controls['firstName'].setValue(this.onUpdateUser.firstName);
      this.registerForm.controls['lastName'].setValue(this.onUpdateUser.lastName);
      this.registerForm.controls['email'].setValue(this.onUpdateUser.email);
      this.registerForm.controls['password'].setValue(this.onUpdateUser.password);
      this.registerForm.controls['phoneNumber'].setValue(this.onUpdateUser.phoneNumber);
      this.registerForm.controls['city'].setValue(this.onUpdateUser.city);
      this.registerForm.controls['enabled'].setValue(this.onUpdateUser.enabled);
      this.registerForm.controls['appUserRole'].setValue(this.onUpdateUser.appUserRole);
    }
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
  checked = false;

  add() {
    console.log(this.registerForm.valid)
    if (!this.onUpdateUser) {
      if (this.registerForm.valid) {
        this.authService.addUser(this.registerForm.value)
          .subscribe({
            next: (res) => {
              this._snackBar.open('user added successfully', '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ["custom-style"]
              });
              //alert("user added successfully")
              this.registerForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              this._snackBar.open('error', '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ["custom-style-"]
              });
            }
          })
      }
    } else {
      this.updateUser();
      console.log("update mode")
    }
  }

  updateUser() {
    this.authService.updateUser(this.registerForm.value)
      .subscribe(
        (res: User) => {
          console.log(res)
          this._snackBar.open('user updated successfully', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["custom-style"]
          });
          this.registerForm.reset();
          this.dialogRef.close('Update');
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          this._snackBar.open('error', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ["custom-style-"]
          });
        })
  }


}

