import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {


  formularioUser: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {


    this.formularioUser = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/)
      ]],
      username: ['', [
        Validators.required,
        Validators.email
      ]],
      name: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      lastname: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      passwordconfirm: ['', [
        Validators.required,
      ]]
    });
  }

  passwordHidden: { [key: string]: boolean } = {};
  isLogged: boolean = false;

  get f() { return this.formularioUser.controls; }
  onSubmit(){

    
  }

  togglePasswordVisibility(event: Event, inputId: string) {
    event.preventDefault();
    const inputElement = document.querySelector(`#${inputId}`);
    if (!inputElement) return; 
    const eyeIcon = inputElement.nextElementSibling?.querySelector('i');
    if (!eyeIcon) return;
    this.passwordHidden[inputId] = !this.passwordHidden[inputId];
    const inputType = this.passwordHidden[inputId] ? 'password' : 'text';
    
    eyeIcon.classList.toggle('fa-eye-slash');
    eyeIcon.classList.toggle('fa-eye');
    
    inputElement.setAttribute('type', inputType);
    
    const formControl = this.formularioUser.get(inputId);
    if (formControl) {
      formControl.updateValueAndValidity();
    }
  }
  
  createAccount(){
    let pass: string | null = (document.querySelector('#pass-login') as HTMLInputElement).value;
    let passConfirm: string | null = (document.querySelector('#pass-login-confirm') as HTMLInputElement).value;

  }

  volverLogin(){
    this.isLogged = false;
    this.router.navigate(['']);
  }

}
