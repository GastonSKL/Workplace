import { Component, OnInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

  id: number = 0;


  formularioEditar: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute) { 
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
    this.formularioEditar.markAllAsTouched();
    if (this.formularioEditar.valid) {
      this.router.navigate(['home']);
    } else {
      return
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    alert('El id de la tarea es: ' + this.id)
  }
}
