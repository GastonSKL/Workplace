import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router)  {
    
  }

}
