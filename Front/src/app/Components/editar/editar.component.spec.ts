import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EditarComponent } from './editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Tarea } from '../../Interface/tarea';


