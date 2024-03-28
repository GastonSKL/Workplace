import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchComponent } from '../search/search.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Tarea } from '../../Interface/tarea';
import { AuthGuard } from '../../Guards/auth.guard';
import { AuthService } from '../../Services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  data: Tarea[] = [];
  filteredData: Tarea[] = [];
  filtroCompletadas: boolean | null = null; 
  constructor(private router: Router, private auth: AuthService, private http: HttpClient)  { 

      let id :any = auth.getId();
      this.obtenerTareas(id);
    
  }


  
  obtenerTareas(id: number): Observable<Tarea[]> {
    debugger
    const url = `http://localhost:5238/api/Task/GetAll/${id}`;
    this.http.get<Tarea[]>(url).subscribe(
      (response) => {
        debugger
        this.data = response;
        this.filteredData = [...this.data];
      },
      (error) => {
        console.error('Error al obtener tareas:', error);
      }
    );
    return new Observable<Tarea[]>();
  }

  onSearchInput(value: string) {
    if (value !== '') {
      this.filteredData = this.data.filter(tarea => 
        tarea.des.toLowerCase().includes(value.toLowerCase()) ||
        (tarea.pri !== null && tarea.pri.toString().toLowerCase().includes(value.toLowerCase())) ||
        (tarea.cat !== null && tarea.cat.toString().toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      this.filteredData = [...this.data]; 
    }
}


  onFilterChange(completed: boolean) {
    if (completed) {
      if (this.filtroCompletadas !== true) {
        this.filteredData = this.data.filter(tarea => tarea.com === 1);
        this.filtroCompletadas = true;
      } else {
        this.filteredData = [...this.data];
        this.filtroCompletadas = null; 
      }
    } else {
      if (this.filtroCompletadas !== false) {
        this.filteredData = this.data.filter(tarea => tarea.com === 0);
        this.filtroCompletadas = false;
      } else {
        this.filteredData = [...this.data];
        this.filtroCompletadas = null; 
      }
    }
  }

  onTaskDeleted(id: number): void {
    debugger
    this.data = this.data.filter(tarea => tarea.idTask !== id);
    this.filteredData = [...this.data];
  }
  onTaskUpdated() {
    debugger
    this.obtenerTareas(this.auth.getId());
  }
  
}
