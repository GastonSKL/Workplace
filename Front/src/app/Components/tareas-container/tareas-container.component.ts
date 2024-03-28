import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TareaComponent } from '../tarea/tarea.component';
import { Tarea } from '../../Interface/tarea';
@Component({
  selector: 'app-tareas-container',
  templateUrl: './tareas-container.component.html',
  styleUrl: './tareas-container.component.css'
})
export class TareasContainerComponent {

  @Input() tareas: Tarea[] = [];
  @Output() tareaActualizada: EventEmitter<void> = new EventEmitter<void>();
  @Output() tareaEliminada: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  onDeleteTask(id: number): void {
    debugger
    this.tareaEliminada.emit(id);
  }

  onTaskUpdated(): void {
    debugger
    this.tareaActualizada.emit(); // Emitir evento cuando la tarea se actualiza correctamente
  }
}
