import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from '../../Interface/tarea';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();

  data: Tarea[] = []; 
  filteredData: Tarea[] = []; 

  constructor(private router: Router) { 
    this.data = [
    ];
    this.filteredData = [...this.data]; 
  }

  ngOnInit() {
    this.onSearchInput({ target: { value: '' } } as any);
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim(); 

    if (value !== '') {
      this.filteredData = this.data.filter(tarea => tarea.descripcion.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.filteredData = [...this.data]; 
    }

    this.searchInput.emit(value);
  }

  add_tarea(){
    this.router.navigate([''])
  }
}
