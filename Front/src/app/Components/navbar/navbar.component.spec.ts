import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, HttpClientModule], // Agrega HttpClientModule a los imports
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo', () => {
    const logo = fixture.debugElement.query(By.css('img[src*="work_logo_small.svg"]'));
    expect(logo).toBeTruthy();
  });

  it('should display the notification badge', () => {
    const badge = fixture.debugElement.query(By.css('.notifiacation'));
    expect(badge.nativeElement.textContent.trim()).toBe('1');
  });

  it('should display the profile icon and toggle modal on click', () => {
    const profileIcon = fixture.debugElement.query(By.css('.fa-solid.fa-user'));
    profileIcon.nativeElement.click();
    fixture.detectChanges();
    const modalContainer = fixture.debugElement.query(By.css('.modal-container'));
    expect(modalContainer).toBeTruthy();
  });

  it('should close modal when close button is clicked', () => {
    component.show_modal = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('.fa-solid.fa-xmark'));
    closeButton.nativeElement.click();
    fixture.detectChanges();
    const modalContainer = fixture.debugElement.query(By.css('.modal-container'));
    expect(modalContainer).toBeFalsy();
  });

  
});
