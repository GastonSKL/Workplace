import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user.component';
import { FormErrors } from '../../Interface/form-errors';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.formularioUser.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let errors :FormErrors = {};
    let name = component.formularioUser.controls['name'];
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('lastname field validity', () => {
    let errors :FormErrors= {};
    let lastname = component.formularioUser.controls['lastname'];
    errors = lastname.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('email field validity', () => {
    let errors: FormErrors = {};
    let email = component.formularioUser.controls['username'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();

    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors :FormErrors= {};
    let password = component.formularioUser.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(password.valid).toBeFalsy();

    password.setValue('pass');
    errors = password.errors || {};
    expect(errors['minlength']).toBeTruthy();

    password.setValue('Password1!');
    errors = password.errors || {};
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('passwordconfirm field validity', () => {
    let errors: FormErrors = {};
    let passwordconfirm = component.formularioUser.controls['passwordconfirm'];
    errors = passwordconfirm.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  // it('submitting a form emits a user', () => {
  //   expect(component.formularioUser.valid).toBeFalsy();
  //   component.formularioUser.controls['name'].setValue('Test');
  //   component.formularioUser.controls['lastname'].setValue('User');
  //   component.formularioUser.controls['username'].setValue('test@example.com');
  //   component.formularioUser.controls['password'].setValue('Password1!');
  //   component.formularioUser.controls['passwordconfirm'].setValue('Password1!');
  //   expect(component.formularioUser.valid).toBeTruthy();
  
  //   let emittedUser = null;
  //   component.formSubmitted.((value) => {
  //     emittedUser = value;
  //   });
  
  //   component.onSubmit();
    
  //   expect(emittedUser).toBeTruthy();
  //   // Aquí puedes agregar más expectativas según la lógica de tu aplicación
  // });
  
});
