import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VehicleService} from "../service/vehicle.service";
import {HttpClient, HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {Vehicle} from "../../../model/vehicleCategory";
import {CategoryService} from "../service/category.service";
import {Category} from "../../../model/Category";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

interface model {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-vehicle',
  templateUrl: './dialog-vehicle.component.html',
  styleUrls: ['./dialog-vehicle.component.css']
})
export class DialogVehicleComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload!: ElementRef;
  files = [];
  checked = false;
  userFile: any;
  imgUrl: string | ArrayBuffer = 'assets/picture.png';
  file: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  registerForm !: FormGroup;
  actionBtn: string = "save";
  imgURL: any;
  private imagePath: any;
  categoryList: Category[] | undefined;

  currentFile?: File;
  progress = 0;
  message = '';
  fileName = 'Select File';
  fileInfos?: Observable<any>;

  constructor(private authService: VehicleService, private router: Router, private formBuilder: FormBuilder
    , private dialogRef: MatDialogRef<DialogVehicleComponent>,
              @Inject(MAT_DIALOG_DATA) public onUpdateVehicle: any
    , private http: HttpClient, private catService: CategoryService, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.getCategories();
    this.registerForm = this.formBuilder.group({
      id: [Validators.required],
      model: ['', Validators.required],
      name: ['', Validators.required],
      ranking: ['', Validators.required],
      volumeVeh: ['', Validators.required],
      energy: ['', Validators.required],
      gearBox: ['', Validators.required],
      price: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(5)])],
      description: ['', Validators.required],
      active: [true, Validators.required],
      picture: ['', Validators.required],
    })
    console.log(this.onUpdateVehicle)
    if (this.onUpdateVehicle) {
      this.actionBtn = "Update";
      this.registerForm.controls['id'].setValue(this.onUpdateVehicle.id);
      // this.registerForm.controls['code'].setValue(this.onUpdateVehicle.code);
      this.registerForm.controls['model'].setValue(this.onUpdateVehicle.model);
      this.registerForm.controls['name'].setValue(this.onUpdateVehicle.name);
      this.registerForm.controls['ranking'].setValue(this.onUpdateVehicle.ranking);
      this.registerForm.controls['volumeVeh'].setValue(this.onUpdateVehicle.volumeVeh);
      this.registerForm.controls['energy'].setValue(this.onUpdateVehicle.energy);
      this.registerForm.controls['gearBox'].setValue(this.onUpdateVehicle.gearBox);
      this.registerForm.controls['price'].setValue(this.onUpdateVehicle.price);
      this.registerForm.controls['description'].setValue(this.onUpdateVehicle.description);
      this.registerForm.controls['active'].setValue(this.onUpdateVehicle.active);
      this.registerForm.controls['picture'].setValue(this.onUpdateVehicle.picture);
    }
  }

  models: model[] = [
    {value: 'Audi', viewValue: 'Audi'},
    {value: 'BMW', viewValue: 'BMW'},
    {value: 'Citroen', viewValue: 'Citroen'},
    {value: 'Fiat', viewValue: 'Fiat'},
    {value: 'Ford', viewValue: 'Ford'},
    {value: 'Honda', viewValue: 'Honda'},
    {value: 'Hyundai', viewValue: 'Hyundai'},
    {value: 'Jeep', viewValue: 'Jeep'},
    {value: 'Kia', viewValue: 'Kia'},
    {value: 'Lexus', viewValue: 'Lexus'},
    {value: 'Mazda', viewValue: 'Mazda'},
    {value: 'Mercedes', viewValue: 'Mercedes'},
    {value: 'Mitsubishi', viewValue: 'Mitsubishi'},
    {value: 'Nissan', viewValue: 'Nissan'},
    {value: 'Opel', viewValue: 'Opel'},
    {value: 'Toyota', viewValue: 'Toyota'}
  ]
  rank: model[] = [
    {value: 'Small', viewValue: 'Small'},
    {value: 'Medium', viewValue: 'Medium'},
    {value: 'Big', viewValue: 'Big'},
  ]
  volumes: model[] = [
    {value: '2', viewValue: '2'},
    {value: '5', viewValue: '5'},
    {value: '7', viewValue: '7'}
  ]
  energies: model[] = [
    {value: 'Diesel', viewValue: 'Diesel'},
    {value: 'Essence', viewValue: 'Essence'}
  ]


  gearBoxs: model[] = [
    {value: 'Manual', viewValue: 'Manual'},
    {value: 'Automatic', viewValue: 'Automatic'}
  ]

  add() {
    console.log(this.registerForm)
    if (!this.onUpdateVehicle) {
      if (this.registerForm.valid) {
        const formData = new FormData();
        formData.append('model', this.registerForm.get('model')?.value);
        formData.append('name', this.registerForm.get('name')?.value);
        formData.append('ranking', this.registerForm.get('ranking')?.value);
        formData.append('active', this.registerForm.get('active')?.value);
        formData.append('volume', this.registerForm.get('volume')?.value);
        formData.append('energy', this.registerForm.get('energy')?.value);
        formData.append('price', this.registerForm.get('price')?.value);
        formData.append('gearBox', this.registerForm.get('gearBox')?.value);
        formData.append('description', this.registerForm.get('description')?.value);
        if (this.file!=null){
          formData.append('vehiclePicture',this.file,this.file.name)
        }
        this.authService.addVehicle(formData)
          .subscribe({
            next: (res) => {
              console.log("data is ",res)
              this._snackBar.open('vehicle added successfully', '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ["custom-style"]
              });
              this.registerForm.reset();
              this.dialogRef.close('save');
            },
            error: (err) => {
              console.log("error is ",err)
              this._snackBar.open('vehicle added successfully', '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ["custom-style"]
              });
            }
          })
      }
    } else {
      this.updateVehicle();
    }
  }

  getCategories() {
    this.catService.getCategories().subscribe({
        next: (res) => {
          this.categoryList = res;
        }, error: () => {
          alert("error")
        }
      }
    );

  }

  updateVehicle() {
    this.authService.updateVehicle(this.registerForm.value)
      .subscribe(
        (res: Vehicle) => {
          console.log(res)
          alert("Vehicle updated successfully")
          this.registerForm.reset();
          this.dialogRef.close('Update');
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert("error")
        })

  }
  selectFile(event: any) {
    this.file = event.target.files[0];
  }
}
