import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomePageComponent } from "./home-page/home-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {UserPageComponent} from "./user-page/user-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'reg', component: RegistrationPageComponent},
  {path: 'user', component: UserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
