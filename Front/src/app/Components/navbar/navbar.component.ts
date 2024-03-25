import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  show_modal: boolean = false;

constructor(private router: Router, private auth: AuthService) { }


  mostrar_modal(){
    this.show_modal = true;
  }

  cerrar_modal(){
    this.show_modal = false;
  }

  cerrar_sesion(){
    this.auth.logout()
    this.router.navigate(['']);
  }
}
