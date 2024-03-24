import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private httpClient = inject(HttpClient);
  private baseUrl:string;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
      this.baseUrl = 'http://localhost:44338';
   }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  register(formValue: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/User/Login`, formValue)
    )
  }
}
