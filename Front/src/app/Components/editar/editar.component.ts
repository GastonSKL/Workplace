import { Component, OnInit, ElementRef  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Tarea } from '../../Interface/tarea';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

  id: number = 0;
  com:number | null= 0;
  FecCre:string | null = "";

  formularioEditar: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute, private auth:AuthService, private http:HttpClient, private el: ElementRef) { 


    this.formularioEditar = this.formBuilder.group({
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
  get f() { return this.formularioEditar.controls; }

  volver_home(){
    this.router.navigate(['home'])
  }
  substraer(tipo: boolean){
    debugger
    let input = document.querySelector('#prioridad-edit') as HTMLInputElement;
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
    this.formularioEditar.markAllAsTouched();
    if (this.formularioEditar.valid) {
      this.updateTask();
      
    } else {
      return
    }
  }

  getData(){
    let idTask: number = this.id;
    let idUser: number = this.auth.getId();

    const title = this.el.nativeElement.querySelector('#titulo-edit');
    const prio = this.el.nativeElement.querySelector('#prioridad-edit');
    const cat = this.el.nativeElement.querySelector('#cat-edit');
    const des = this.el.nativeElement.querySelector('#des-edit');
    const counter = this.el.nativeElement.querySelector('#counterNumber');

    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    debugger;
    this.http.get<Tarea>(`http://localhost:5238/api/Task/${idTask}`,{headers}).subscribe(
      (response) => {
        debugger;
        console.log(response.idTask);
        title.value = response.tit; // Establecer el valor usando la propiedad value
        prio.value = response.pri;
        cat.value = response.cat;
        des.value = response.des;
        counter.innerHTML  = prio.value;
        this.FecCre = response.fecCre;
        this.com = response.com;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
      }
    );

  }

  updateTask() {
    debugger
    let idUser = this.auth.getId()

    var fechaActual = new Date();
    var año = fechaActual.getFullYear();
    var mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); 
    var dia = ('0' + fechaActual.getDate()).slice(-2);
    var horas = ('0' + fechaActual.getHours()).slice(-2);
    var minutos = ('0' + fechaActual.getMinutes()).slice(-2);
    var segundos = ('0' + fechaActual.getSeconds()).slice(-2);
    var fechaFormateada = año + '-' + mes + '-' + dia + 'T' + horas + ':' + minutos + ':' + segundos;

    let title: string | null = (document.querySelector('#titulo-edit') as HTMLInputElement).value;
    let pri: string | null = (document.querySelector('#prioridad-edit') as HTMLInputElement).value;
    let cat: string | null = (document.querySelector('#cat-edit') as HTMLInputElement).value;
    let des: string | null = (document.querySelector('#des-edit') as HTMLInputElement).value;


    const task = {
      IdTask: this.id,
      IdUser: idUser,
      Cat: cat,
      Pri: pri,
      Com: this.com,
      Tit: title,
      Des: des,
      FecEdi: fechaFormateada,
      FecCre: this.FecCre
    };

    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.http.put(`http://localhost:5238/api/Task/`, task, {headers}).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error  => {
        if(error.error.text == "Task updated."){
          alert("Tarea editada!")
          this.router.navigate(['home']);
        }else{
          alert("Ocurrio un error")
          console.error('Error al actualizar la tarea:', error);
        }
      }
    );
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    debugger
    this.getData();

  }
}
