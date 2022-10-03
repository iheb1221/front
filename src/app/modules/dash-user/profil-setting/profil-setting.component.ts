import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../model/User";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../dashboard/service/user.service";

interface city {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-profil-setting',
  templateUrl: './profil-setting.component.html',
  styleUrls: ['./profil-setting.component.css']
})
export class ProfilSettingComponent implements OnInit {
  registerForm!: FormGroup;
  loggedUser!: User;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private userService: UserService) {
    this.loggedUser = new User();
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem("USER_ID");
    this.userService.getUserById(currentUser).subscribe((data: User) => {
      this.loggedUser = data;
    })
    console.log(this.loggedUser)
    this.registerForm = this.formBuilder.group({
      id: [Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
        ]],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required]
    });
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

  update() {
    console.log(this.registerForm.value)
    this.userService.editProfile(this.loggedUser).subscribe(() => {
      console.log("snack bar")
      this.router.navigate(['/dashboard/statistic']);
    }, error => console.log(error.error));
  }
}
