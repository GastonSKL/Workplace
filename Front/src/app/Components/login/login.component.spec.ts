import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../Services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a form with username and password fields', () => {
    const formElement = fixture.debugElement.query(By.css('form'));
    expect(formElement).toBeTruthy();

    const emailInput = fixture.debugElement.query(By.css('input[type="email"]'));
    expect(emailInput).toBeTruthy();

    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]'));
    expect(passwordInput).toBeTruthy();
  });

  it('should validate email field as required', () => {
    const emailInput = component.formulario.controls['username'];
    expect(emailInput.valid).toBeFalsy();

    emailInput.setValue('');
    expect(emailInput.hasError('required')).toBeTruthy();

    emailInput.setValue('invalidemail');
    expect(emailInput.hasError('email')).toBeTruthy();

    emailInput.setValue('validemail@example.com');
    expect(emailInput.valid).toBeTruthy();
  });

  it('should validate password field', () => {
    const passwordInput = component.formulario.controls['password'];
    expect(passwordInput.valid).toBeFalsy();

    passwordInput.setValue('');
    expect(passwordInput.hasError('required')).toBeTruthy();

    passwordInput.setValue('short');
    expect(passwordInput.hasError('minlength')).toBeTruthy();

    passwordInput.setValue('noCapital123');
    expect(passwordInput.hasError('pattern')).toBeTruthy();

    passwordInput.setValue('GoodP@ssw0rd');
    expect(passwordInput.valid).toBeTruthy();
  });

  it('should call goToCreate method when create user button is clicked', () => {
    spyOn(component, 'goToCreate');
    const createButton = fixture.debugElement.query(By.css('#create-btn')).nativeElement;
    createButton.click();
    expect(component.goToCreate).toHaveBeenCalled();
  });

});
