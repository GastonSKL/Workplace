import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

constructor(private router: Router) { }


  add_tarea(){
    this.router.navigate([''])
  }

}
