import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';

import {RouterModule, Routes} from "@angular/router";
import {AddFormComponent} from './profil/add-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogComponent} from './dialog/dialog.component';
import {FormUserComponent} from './form-user/form-user.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from '@angular/material/sort';
import {VehiclesComponent} from './vehicles/vehicles.component';
import {DialogVehicleComponent} from './dialog-vehicle/dialog-vehicle.component';
import {FileUploadModule} from 'smart-webcomponents-angular/fileupload';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {ReservationComponent} from './reservation/reservation.component';
import {MatTableExporterModule} from 'mat-table-exporter';

import {MapsComponent} from './maps/maps.component';
import {DropDownListModule} from "@syncfusion/ej2-angular-dropdowns";
import {StatisticComponent} from './statistic/statistic.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {GoogleMapsModule} from '@angular/google-maps'
import {AccordionModule} from 'primeng/accordion';
import {MessageService} from 'primeng/api';
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {GMapModule} from "primeng/gmap";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ChartModule} from 'primeng/chart';
import {AvatarModule} from "primeng/avatar";
import {CardModule} from "primeng/card";
const apiKey = "";
const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'users', component: FormUserComponent
      },
      {
        path: 'updateProfile', component: AddFormComponent
      },
      {
        path: 'vehicle', component: VehiclesComponent
      },
      {
        path: 'reservation', component: ReservationComponent
      },
      {
        path: 'statistic', component: StatisticComponent
      },
      {
        path: 'maps', component: MapsComponent
      }
    ]
  }
]

@NgModule({
    declarations: [
        DashboardComponent,
        AddFormComponent,
        DialogComponent,
        FormUserComponent,
        VehiclesComponent,
        DialogVehicleComponent,
        ReservationComponent,
        MapsComponent,
        StatisticComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        FormsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        FileUploadModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatTableExporterModule,
        DropDownListModule,
        MatProgressBarModule,
        GoogleMapsModule,
        AccordionModule,
        CheckboxModule,
        DialogModule,
        GMapModule,
        ToastModule,
        ButtonModule,
        FormsModule,
        InputTextModule,
        ChartModule,
        AvatarModule,
        CardModule
    ],
    providers: [MessageService],
    exports: [
        MapsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {
}
