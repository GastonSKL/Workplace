import { Component, Input } from '@angular/core';
import { TareaComponent } from '../tarea/tarea.component';
import { Tarea } from '../../Interface/tarea';
@Component({
  selector: 'app-tareas-container',
  templateUrl: './tareas-container.component.html',
  styleUrl: './tareas-container.component.css'
})
export class TareasContainerComponent {

  @Input() tareas: Tarea[] = [];

  constructor() { }
}
