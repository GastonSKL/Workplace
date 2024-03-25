import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'createUser',component: CreateUserComponent},
  {path: 'home',component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
