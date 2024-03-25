import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrl: './add-tarea.component.css'
})
export class AddTareaComponent {

  formularioCreate: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router) { 
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
    this.formularioCreate.markAllAsTouched();
    if (this.formularioCreate.valid) {
      this.router.navigate(['home']);
    } else {
      return
    }
  }
}
