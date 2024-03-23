import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {


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
      return;
    }

    this.isLogged = true;
    console.log('Formulario válido');
    alert('asdasd')
  }

  goToCreate(){
    this.router.navigate(['createUser']);
  }
}
