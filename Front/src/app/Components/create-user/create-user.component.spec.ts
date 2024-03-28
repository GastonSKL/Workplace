import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import { By } from '@angular/platform-browser';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [ReactiveFormsModule, HttpClientModule], 
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo', () => {
    const logo = fixture.debugElement.query(By.css('img[src*="work_logo.svg"]'));
    expect(logo).toBeTruthy();
  });

  it('should display form fields', () => {
    const nameInput = fixture.debugElement.query(By.css('input[id="name-login"]'));
    expect(nameInput).toBeTruthy();

    const lastNameInput = fixture.debugElement.query(By.css('input[id="lastname-login"]'));
    expect(lastNameInput).toBeTruthy();

    const emailInput = fixture.debugElement.query(By.css('input[id="email-login"]'));
    expect(emailInput).toBeTruthy();

    const passwordInput = fixture.debugElement.query(By.css('input[id="pass-login"]'));
    expect(passwordInput).toBeTruthy();

    const confirmPasswordInput = fixture.debugElement.query(By.css('input[id="pass-login-confirm"]'));
    expect(confirmPasswordInput).toBeTruthy();
  });

  it('should call onSubmit method when create user button is clicked', () => {
    spyOn(component, 'onSubmit');
    const createUserButton = fixture.debugElement.query(By.css('#log-btn'));
    createUserButton.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call volverLogin method when back button is clicked', () => {
    spyOn(component, 'volverLogin');
    const backButton = fixture.debugElement.query(By.css('#create-btn'));
    backButton.nativeElement.click();
    expect(component.volverLogin).toHaveBeenCalled();
  });

});
