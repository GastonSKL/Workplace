// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { log } from 'console';
import { UserResponse } from '../Interface/user-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private email: string = "";
  private id: number = 0;
  constructor(private http: HttpClient, private router: Router) { }

  login(mail :string, pass :string) {

    const userData = {
      mail: mail,
      pass: pass
    };

    this.http.post<UserResponse>('http://localhost:5238/api/User/loggin', userData).subscribe(
      (response) => {
        debugger
        this.isLoggedIn = true;
        this.email = mail;
        this.id = response.idUser;
        console.log(response);
        
        this.router.navigate(['home']);
      },
      (error) => {
        alert("Falla de logueo");
      }
    );
  }

  create(name :string,mail :string,lastname :string,pass :string){
    const userData = {
      Nom: name,
      Ape: lastname,
      Pas: pass,
      Mai: mail
    };
    debugger
    this.http.post('http://localhost:5238/api/User/', userData).subscribe(
      (response) => {
        debugger
        console.log(JSON.parse(response.toString()));
        this.isLoggedIn = true;
        this.router.navigate(['home']);
      },
      (error) => {
        alert(error.error.text.toString());
        if(error.error.text.toString()=="User created."){
          this.email = mail;
          this.isLoggedIn = true;
          this.router.navigate(['home']);
        }
      }
    );
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  emailUser(){
    return this.email;
  }

  getId(){
    return this.id;
  }
}
