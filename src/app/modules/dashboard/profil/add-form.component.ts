import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {User} from "../../../model/User";

interface city {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  isLoaded = false;
  registerForm!: FormGroup;
  loggedUser!: User;
  currentUserId!: number;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private userService: UserService) {
    this.loggedUser = new User();
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem("ADMIN_ID");
    this.userService.getUserById(currentUser).subscribe((data: User) => {
      this.loggedUser = data;
    })
    this.currentUserId = parseInt(localStorage.getItem("ADMIN_ID") + "");
    console.log(".......", this.currentUserId)

    this.registerForm = this.formBuilder.group({
      id: [this.currentUserId, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
        ]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{8,8}")]],
      appUserRole: ['ADMIN', Validators.required],
      enabled: [true, Validators.required],
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
    this.userService.updateUser(this.registerForm.value).subscribe(() => {
      console.log("snack bar")
      this.router.navigate(['/dashboard/statistic']);
    }, error => console.log(error.error));
  }
}
