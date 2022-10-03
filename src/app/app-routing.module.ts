import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {ConfirmationPasswordComponent} from "./confirmation-password/confirmation-password.component";
import {AuthGuard} from "./shared/auth.guard";
import {DashComponent} from "./modules/dash-user/dash/dash.component";
import {TestComponent} from "./test/test.component";
import {ProfilSettingComponent} from "./modules/dash-user/profil-setting/profil-setting.component";


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'test', component: TestComponent},
  {path: 'reset', component: ConfirmationPasswordComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dash',
    loadChildren: () => import('./modules/dash-user/dash.module').then(mod => mod.DashModule),

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [LoginComponent, SignupComponent]
