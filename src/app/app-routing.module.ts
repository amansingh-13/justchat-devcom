import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from  './user/login/login.component';
import { RegisterComponent } from  './user/register/register.component';
import { HomeComponent } from  './home/home/home.component';
import { LogoutComponent } from './user/logout/logout.component';

const routes: Routes = [
  { path:  'login',component:  LoginComponent},
  { path:  'register', component:  RegisterComponent },
  { path:  'home', component:  HomeComponent },
  { path:  'logout', component:  LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
