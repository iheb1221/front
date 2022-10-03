import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {RouterModule} from "@angular/router";

import {HttpClientModule} from '@angular/common/http';
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {NgxPopper} from 'angular-popper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationPasswordComponent} from './confirmation-password/confirmation-password.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from '@angular/material/snack-bar';

//import {AuthGuard} from "./shared/auth.guard";
import {DashComponent} from './modules/dash-user/dash/dash.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LoadingSpinner} from "./shared/loading-spinner/loading-spinner";
import {AuthService} from "./service/auth.service";
import {AuthInterceptor} from "./shared/_helpers/auth.interceptor";
import {AppComponent} from "./app.component";
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {CalendarModule} from "primeng/calendar";
import {ReservationDialogComponent} from "./modules/dash-user/reservation-dialog/reservation-dialog.component";
import {MatStepperModule} from "@angular/material/stepper";
import {TextMaskModule} from "angular2-text-mask";
import {TestComponent} from "./test/test.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {PasswordDialogComponent} from './password-dialog/password-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ToastModule} from 'primeng/toast';
import {MessageService} from "primeng/api";
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import {ProfilSettingComponent} from "./modules/dash-user/profil-setting/profil-setting.component";
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SignupComponent,
    LoginComponent,
    ConfirmationPasswordComponent,
    LoadingSpinner,
    DashComponent,
    ReservationDialogComponent,
    TestComponent,
    PasswordDialogComponent,
    DialogConfirmComponent,
    ProfilSettingComponent
  ],
    imports: [
        RouterModule.forRoot([]),
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgxPopper,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatSelectModule,
        NgxSliderModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSnackBarModule,
        CalendarModule,
        MatStepperModule,
        TextMaskModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        ToastModule,
        DashboardModule
    ],
  providers: [AuthService, AuthInterceptor,MessageService],
  bootstrap: [AppComponent],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AppModule {
}
