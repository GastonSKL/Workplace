import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrl: './add-tarea.component.css'
})
export class AddTareaComponent {

  formularioCreate: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private auth : AuthService, private http :HttpClient) { 
    this.formularioCreate = this.formBuilder.group({
      titulo: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]],
      prioridad: ['', [
        Validators.pattern('^[1-5]$'),
      ]],
      categoria: ['', [
        Validators.required,
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(1)
      ]]
    });
  }
  get f() { return this.formularioCreate.controls; }
  volver_home(){
    this.router.navigate(['home'])
  }
  substraer(tipo: boolean){
    debugger
    let input = document.querySelector('#prioridad-create') as HTMLInputElement;
    let counter = document.querySelector('#counterNumber') as HTMLInputElement;
    let valor = input.value;
    let valorCounter = counter.textContent;
    let valorNum = valor != "" ? parseInt(valor) : 0;
    let valorNumCounter = valorCounter != undefined ? parseInt(valorCounter) : 0;

    if(tipo)
    {
        if(valorNum < 5)
        {
          input.value = (valorNum + 1).toString();
          counter.textContent = '';
          counter.textContent = (valorNumCounter + 1).toString();
        }
    }else{
      if(valorNum > 0)
        {
          input.value = (valorNum - 1).toString();
          counter.textContent = '';
          counter.textContent = (valorNumCounter - 1).toString();
        }
    }
  }
  onSubmit(){
    debugger

    if (this.formularioCreate.invalid) {
      alert('Datos invalidos');
      return;
    }else{
      this.createTask();
    }
  }

  createTask(){
    debugger
    let title       : string | null = (document.querySelector('#titulo-add') as HTMLInputElement).value;
    let priority    : string | null = (document.querySelector('#prioridad-create') as HTMLInputElement).value;
    let category    : string | null = (document.querySelector('#categoria-create') as HTMLInputElement).value;
    let description : string | null = (document.querySelector('#des-create') as HTMLInputElement).value;
    let id :any = this.auth.getId();

    var fechaActual = new Date();
    var año = fechaActual.getFullYear();
    var mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); 
    var dia = ('0' + fechaActual.getDate()).slice(-2);
    var horas = ('0' + fechaActual.getHours()).slice(-2);
    var minutos = ('0' + fechaActual.getMinutes()).slice(-2);
    var segundos = ('0' + fechaActual.getSeconds()).slice(-2);
    var fechaFormateada = año + '-' + mes + '-' + dia + 'T' + horas + ':' + minutos + ':' + segundos;

    const taskNew = {
    IdUser: id,
    Cat: category,
    Pri: priority,
    Com: 0,
    Tit: title,
    Des: description,
    FecEdi: fechaFormateada,
    FecCre: fechaFormateada
    };

    this.http.post<Response>('http://localhost:5238/api/Task/', taskNew).subscribe(
      (response) => {
        debugger
        console.log(response.statusText);
        this.router.navigate(['home']);
      },
      (error: HttpErrorResponse) => {
        if(error.error.text == "Task created."){
          alert("Tarea creada correctamente")
          this.router.navigate(['home']);
        }else{
          alert("Fallo la creacion");
        }
      }
    );
  }
}
