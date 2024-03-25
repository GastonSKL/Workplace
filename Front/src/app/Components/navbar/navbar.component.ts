import { Component } from '@angular/core';
import { ModalService } from '../../Services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

constructor(private router: Router, private modalService: ModalService) { }
openModal() {
  this.modalService.openModal();
}
}
