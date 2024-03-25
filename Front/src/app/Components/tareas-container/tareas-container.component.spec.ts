import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasContainerComponent } from './tareas-container.component';

describe('TareasContainerComponent', () => {
  let component: TareasContainerComponent;
  let fixture: ComponentFixture<TareasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareasContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
