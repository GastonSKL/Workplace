import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { TareaComponent } from './Components/tarea/tarea.component';
import { LoginServiceService } from './Services/login-service.service';
import { HomeComponent } from './Components/home/home.component';
import { SearchComponent } from './Components/search/search.component';
import { FiltrosComponent } from './Components/filtros/filtros.component';
import { TareasContainerComponent } from './Components/tareas-container/tareas-container.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AddTareaComponent } from './Components/add-tarea/add-tarea.component';
import { EditarComponent } from './Components/editar/editar.component';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    TareaComponent,
    HomeComponent,
    SearchComponent,
    FiltrosComponent,
    TareasContainerComponent,
    NavbarComponent,
    AddTareaComponent,
    EditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
