import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  @Output() filterChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  filterCompleted(completed: boolean) {
    debugger
    let btn_completadas = document.querySelector("#completas");
    let btn_nocompletadas = document.querySelector("#Incompletas");

    if(completed){
      if(btn_completadas?.classList.contains('filtros-secondary-button')){
        btn_completadas?.classList.remove('filtros-secondary-button');
        btn_completadas?.classList.add('filtros-primary-button');
        btn_nocompletadas?.classList.remove('filtros-primary-button');
        btn_nocompletadas?.classList.add('filtros-secondary-button');
      }else{
        btn_completadas?.classList.remove('filtros-primary-button');
        btn_completadas?.classList.add('filtros-secondary-button');
      }
    }else{
      if(btn_nocompletadas?.classList.contains('filtros-secondary-button')){
        btn_nocompletadas?.classList.remove('filtros-secondary-button');
        btn_nocompletadas?.classList.add('filtros-primary-button');
        btn_completadas?.classList.remove('filtros-primary-button');
        btn_completadas?.classList.add('filtros-secondary-button');
      }else{
        btn_nocompletadas?.classList.remove('filtros-primary-button');
        btn_nocompletadas?.classList.add('filtros-secondary-button');
      }
    }

    this.filterChange.emit(completed);


  }

  
}
