import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddTareaComponent } from './add-tarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../Services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

// describe('AddTareaComponent', () => {
//   let component: AddTareaComponent;
//   let fixture: ComponentFixture<AddTareaComponent>;
//   let router: Router;
//   let httpTestingController: HttpTestingController;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [ AddTareaComponent ],
//       imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule ],
//       providers: [ AuthService ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddTareaComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     httpTestingController = TestBed.inject(HttpTestingController);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize form with empty values', () => {
//     expect(component.formularioCreate.value).toEqual({
//       titulo: '',
//       prioridad: '',
//       categoria: '',
//       descripcion: ''
//     });
//   });

//   it('should call createTask when form is valid', () => {
//     const spyCreateTask = spyOn(component, 'createTask').and.callThrough();
//     component.formularioCreate.patchValue({
//       titulo: 'Test Task',
//       prioridad: '3',
//       categoria: '1',
//       descripcion: 'This is a test task'
//     });
//     component.onSubmit();
//     expect(spyCreateTask).toHaveBeenCalled();
//   });

//   it('should send HTTP request to create task', () => {
//     component.formularioCreate.patchValue({
//       titulo: 'Test Task',
//       prioridad: '3',
//       categoria: '1',
//       descripcion: 'This is a test task'
//     });
//     component.createTask();
//     const req = httpTestingController.expectOne('http://localhost:5238/api/Task/');
//     expect(req.request.method).toEqual('POST');
//     req.flush('Task created.', { status: 200, statusText: 'OK' });
//     httpTestingController.verify();
//   });

//   it('should navigate to home page after creating task', () => {
//     const navigateSpy = spyOn(router, 'navigate');
//     component.formularioCreate.patchValue({
//       titulo: 'Test Task',
//       prioridad: '3',
//       categoria: '1',
//       descripcion: 'This is a test task'
//     });
//     component.createTask();
//     const req = httpTestingController.expectOne('http://localhost:5238/api/Task/');
//     req.flush('Task created.', { status: 200, statusText: 'OK' });
//     expect(navigateSpy).toHaveBeenCalledWith(['home']);
//     httpTestingController.verify();
//   });
// });
