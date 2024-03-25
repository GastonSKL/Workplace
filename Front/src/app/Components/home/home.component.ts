import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Tarea } from '../../Interface/tarea';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  data: Tarea[] = [];
  filteredData: Tarea[] = [];
  filtroCompletadas: boolean | null = null; 
  constructor(private router: Router)  { 

    this.data = [
      {
        id: 1,
        fecha: '2024-03-25',
        categoria: 1,
        descripcion: 'Hacer la compra',
        prioridad: 2,
        check: 0
      },
      {
        id: 2,
        fecha: '2024-03-26',
        categoria: 2,
        descripcion: 'Estudiar para el examen',
        prioridad: 1,
        check: 1
      },
      {
        id: 3,
        fecha: '2024-03-27',
        categoria: 1,
        descripcion: 'Ir al gimnasio',
        prioridad: 3,
        check: 0
      },
      {
        id: 4,
        fecha: '2024-03-28',
        categoria: 3,
        descripcion: 'Llamar a mamá',
        prioridad: 2,
        check: 1
      },
      {
        id: 5,
        fecha: '2024-03-29',
        categoria: 2,
        descripcion: 'Terminar el proyecto',
        prioridad: 1,
        check: 0
      }
    ];
    this.filteredData = [...this.data];
  }

  onSearchInput(value: string) {
    this.filteredData = this.data.filter(tarea => tarea.descripcion.toLowerCase().includes(value.toLowerCase()));
  }

  onFilterChange(completed: boolean) {
    if (completed) {
      if (this.filtroCompletadas !== true) {
        this.filteredData = this.data.filter(tarea => tarea.check === 1);
        this.filtroCompletadas = true;
      } else {
        this.filteredData = [...this.data];
        this.filtroCompletadas = null; 
      }
    } else {
      if (this.filtroCompletadas !== false) {
        this.filteredData = this.data.filter(tarea => tarea.check === 0);
        this.filtroCompletadas = false;
      } else {
        this.filteredData = [...this.data];
        this.filtroCompletadas = null; 
      }
    }
  }
  
  
}
