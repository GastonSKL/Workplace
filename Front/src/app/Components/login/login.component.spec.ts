import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { FormErrors } from '../../Interface/form-errors';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors: FormErrors = {};
    const email = component.formulario.controls['username'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();

    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors: FormErrors = {};
    const password = component.formulario.controls['password'];
    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('short');
    errors = password.errors || {};
    expect(errors['minlength']).toBeTruthy();

    password.setValue('alllowercase');
    errors = password.errors || {};
    expect(errors['pattern']).toBeTruthy();

    password.setValue('ValidPassword1!');
    errors = password.errors || {};
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('should submit form when valid', () => {
    spyOn(window, 'alert');
    component.formulario.controls['username'].setValue('test@example.com');
    component.formulario.controls['password'].setValue('ValidPassword1!');
    component.onSubmit();
    expect(component.isLogged).toBe(true);
    expect(window.alert).toHaveBeenCalledWith('asdasd');
  });

  it('should not submit form when invalid', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(component.isLogged).toBe(false);
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should navigate to "createUser" route when goToCreate() is called', () => {
    spyOn(router, 'navigate'); 

    component.goToCreate();

    expect(router.navigate).toHaveBeenCalledWith(['createUser']);
  });

});
