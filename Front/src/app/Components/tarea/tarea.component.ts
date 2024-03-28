import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EditarComponent } from '../editar/editar.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {

  @Output() tareaEliminada: EventEmitter<number> = new EventEmitter<number>();
  @Output() tareaActualizada: EventEmitter<void> = new EventEmitter<void>();

  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() date: string | null= '';
  @Input() dateEdit: string | null= '';
  @Input() pri: number | null = 0;
  @Input() des: string = '';
  @Input() check: boolean = false;
  @Input() cat: number | null = 0;

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) { }

  irAEditar() {
    this.router.navigate(['/editar', this.id]);
  }

    eliminarTarea(id: number): void{
    debugger
    if(confirm("Desea eliminar esta tarea?")){
      const url = `http://localhost:5238/api/Task/${id}`;
      this.http.delete(url).subscribe(
        response => {
          console.log('Tarea eliminada:', response);
          this.router.navigate(['home']);
          this.tareaEliminada.emit(id);

        },
        error => {
          debugger
          console.error('Error al eliminar la tarea:', error);
          this.tareaEliminada.emit(id);
        }
      );
    }else{
      return;
    }
  }

  updateTask(IdTask: number, Cat :number | null, Pri:number | null,com:number,tit:string,des:string,FecCre:string | null) {
    debugger
    let idUser = this.auth.getId()

    var actualDate = new Date();
    var year = actualDate.getFullYear();
    var month = ('0' + (actualDate.getMonth() + 1)).slice(-2); 
    var day = ('0' + actualDate.getDate()).slice(-2);
    var hour = ('0' + actualDate.getHours()).slice(-2);
    var minute = ('0' + actualDate.getMinutes()).slice(-2);
    var seconds = ('0' + actualDate.getSeconds()).slice(-2);
    var formatedDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + seconds;

    const task = {
      IdTask: IdTask,
      IdUser: idUser,
      Cat: Cat,
      Pri: Pri,
      Com: com == 0 ? 1 : 0,
      Tit: tit,
      Des: des,
      FecEdi: formatedDate,
      FecCre: FecCre
    };

    const tareaElemento = document.getElementById(`id-tarea-${IdTask}`) as HTMLElement;
  
    this.http.put(`http://localhost:5238/api/Task/`, task).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error  => {
        if(error.error.text == "Task updated."){
          alert("Tarea catalogada como completada")
          this.check = !this.check;
          this.tareaActualizada.emit();
        }else{
          alert("Ocurrio un error")
          console.error('Error al actualizar la tarea:', error);
        }
      }
    );
  }

}
