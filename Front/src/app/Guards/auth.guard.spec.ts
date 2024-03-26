import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard; // Declara una variable para guardar la instancia del guardia

  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guard.canActivate()); // Llama al método canActivate de la instancia guard

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard); // Inyecta la instancia del guardia
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Verifica que la instancia del guardia sea creada exitosamente
  });
});
