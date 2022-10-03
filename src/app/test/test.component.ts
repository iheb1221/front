import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {VehicleService} from "../modules/dashboard/service/vehicle.service";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Vehicle} from "../model/vehicleCategory";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  uploads!: any[];
  currentFile?: File;
  progress = 0;
  message = '';
  fileName = 'Select File';
  fileInfos?: Observable<any>;
  registerForm !: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      vehicleId: [Validators.required],
      file: ['', Validators.required],
      age: ['', Validators.required],
      model: ['', Validators.required],
    })
  }

  constructor(private service:VehicleService,private formBuilder: FormBuilder,private messageService:MessageService) {
  }


  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }
  upload(): void {
    console.log(this.registerForm.value)
    this.progress = 0;
    this.message = "";
    if (this.currentFile) {
      const formData = new FormData();
      formData.append('file', this.registerForm.get('file')?.value);
      formData.append('age', this.registerForm.get('age')?.value);
      formData.append('model', this.registerForm.get('model')?.value);

      this.service.upload(formData).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.service.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
          this.currentFile = undefined;
        });
    }
  }
  public getUploads():void{
    this.service.getFiles().subscribe(
      (response:any[])=>{
        console.log(response)
        this.uploads=response
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
}
