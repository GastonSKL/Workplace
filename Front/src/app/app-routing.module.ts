import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { HomeComponent } from './Components/home/home.component';
import { AddTareaComponent } from './Components/add-tarea/add-tarea.component';
import { AuthGuard } from './Guards/auth.guard';
import { EditarComponent } from './Components/editar/editar.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'add-tarea', component: AddTareaComponent, canActivate: [AuthGuard]},
  {path: 'createUser',component: CreateUserComponent},
  {path: 'home',component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'editar/:id', component: EditarComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
