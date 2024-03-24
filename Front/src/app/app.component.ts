import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from './Services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private loginService: LoginServiceService, private router: Router) {}

  title = 'Front';

  login() {
    this.loginService.setLoggedIn(true);
    this.router.navigate(['/home']);
  }

  logout() {
    this.loginService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
