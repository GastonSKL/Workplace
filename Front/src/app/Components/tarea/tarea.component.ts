import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {

  @Input() id: number = 0;
  @Input() fecha: string = '';
  @Input() prioridad: number = 0;
  @Input() descripcion: string = '';
  @Input() check: boolean = false;
  @Input() categoria: number = 0;

  constructor() { }

  
}
