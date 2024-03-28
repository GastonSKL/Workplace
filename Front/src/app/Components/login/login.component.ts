import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaComponent } from '../tarea/tarea.component';
import { AuthService } from '../../Services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,private http: HttpClient) {


    this.formulario = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/)
      ]],
      username: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  passwordHidden: boolean = true;
  isLogged: boolean = false;

  get f() { return this.formulario.controls; }

  tasks: any[] = [];

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.passwordHidden = !this.passwordHidden;
    const inputType = this.passwordHidden ? 'password' : 'text';
    const eyeIcon = document.querySelector('#show_hide_password i');
    if (eyeIcon) {
      eyeIcon.classList.toggle('fa-eye-slash');
      eyeIcon.classList.toggle('fa-eye');
    }
    const passwordInput = document.querySelector('#pass-login');
    if (passwordInput) {
      passwordInput.setAttribute('type', inputType);
    }
  }

  onSubmit() {
    // Aquí puedes manejar la lógica para enviar el formulario
    if (this.formulario.invalid) {
      alert('Datos invalidos');
      return;
    }else{
      this.login()
    }
  }

  async login(){
    debugger
    let pass = document.querySelector("#pass-login") as HTMLInputElement;
    let passVal :string = pass.value;
    let mail = document.querySelector("#email-login") as HTMLInputElement;
    let mailVal :string = mail.value;
    await this.authService.login(mailVal, passVal);
    
    debugger
    

    // Realizar la solicitud POST
    
  }

  goToCreate(){
    this.router.navigate(['createUser']);
  }
}
