import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {DashComponent} from "./dash/dash.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {ProfilSettingComponent} from './profil-setting/profil-setting.component';
import {VehicleComponent} from './vehicle/vehicle.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import { StatisticComponent } from './statistic/statistic.component';
import {MatTableExporterModule} from "mat-table-exporter";
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
  {
    path: '', component: DashComponent,
    children: [
      {path: 'setting', component: ProfilSettingComponent},
      {path: 'vehicles', component: VehicleComponent},
      {path: 'myReservation', component: StatisticComponent}
    ]
  }
]

@NgModule({
  declarations: [
    VehicleComponent,
    StatisticComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatTableModule,
        MatDialogModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        CalendarModule,
        NgxSliderModule,
        MatTableExporterModule,
        MatPaginatorModule,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashModule {
}
