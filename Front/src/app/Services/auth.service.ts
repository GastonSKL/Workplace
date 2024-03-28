// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { log } from 'console';
import { UserResponse } from '../Interface/user-response';
import { Login } from '../Interface/interface.Login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private email: string = "";
  private id: number = 0;
  private token : string = "";
  constructor(private http: HttpClient, private router: Router) { }

  login(mail :string, pass :string) {

    const userData = {
      mail: mail,
      pass: pass
    };

    this.http.post<Login>('http://localhost:5238/api/User/loggin', userData).subscribe(
      (response) => {
        debugger
        this.isLoggedIn = true;
        this.email = mail;
        this.token = response.token;
        this.getUserId()
        this.router.navigate(['home']);
      },
      (error) => {
        alert("Falla de logueo");
      }
    );
  }

  getToken(){
    return this.token;
  }

  create(name :string,mail :string,lastname :string,pass :string){
    const userData = {
      Nom: name,
      Ape: lastname,
      Pas: pass,
      Mai: mail
    };
    debugger
    this.http.post<Login>('http://localhost:5238/api/User/', userData).subscribe(
      (response) => {
        debugger
        this.isLoggedIn = true;
        this.token = response.token;
        this.email = response.email;
        this.getUserId();
        this.router.navigate(['home']);
      },
      (error) => {
        alert(error.error.text.toString());
        if(error.error.text.toString()=="User created."){
          this.email = mail;
          this.isLoggedIn = true;
          // this.token = response.token;
        let id = this.getUserId();
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

  getUserId(){
  debugger
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.get<UserResponse[]>(`http://localhost:5238/api/User/Getbymail/${this.email}`, { headers }).subscribe(
      (response) => {
        this.id = response[0].idUser;
        
      },
      (error) => {
        alert("Falla al obtener id de usuario");
      }
    );
  }
}
