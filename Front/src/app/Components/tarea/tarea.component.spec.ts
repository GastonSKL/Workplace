import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaComponent } from './tarea.component';

describe('TareaComponent', () => {
  let component: TareaComponent;
  let fixture: ComponentFixture<TareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render task information correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.text-task#fecha-tarea').textContent).toContain('14/12/24 18:30 01:30');
    expect(compiled.querySelector('.text-task#prioridad-nivel').textContent.trim()).toBe('5');
    expect(compiled.querySelector('.text-task#categoria-nivel').textContent.trim()).toBe('Categoría 1');
    expect(compiled.querySelector('.task-info-container-task').textContent.trim()).toBe('Tarea 1');
  });

  

  // You can add more tests for other interactions or functionalities as needed
});
