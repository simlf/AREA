import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { register } from '../models/register.model';
import { login } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  auth_token_login = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InMiLCJpYXQiOjE2NzQ3NTczMzUsImV4cCI6MTY3NjI1NzMzNX0.hMS6HfkJSMa5_UV6zqWNrOav5OSd-Ih6SEJsTHi6hbg";
  auth_token_whoami = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHR0aGlzNiIsImlhdCI6MTY3NDc3Mzg4NSwiZXhwIjoxNjc2MjczODg1fQ.T2kbgylTjswTPFuiBx-MDQnskAwZSyxEs7FA_OUUzSY";

  headersLogin = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token_login}`
  });

  headersWhoami = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token_whoami}`
  });

  bodyRegister: register = {
    username: 'mattthis6',
    password: 'password',
    email: 'email@email.com'
  };

  bodyLogin: login = {
    email: 'email@email.com',
    password: 'password'
  };

  rootURL = 'http://localhost:8080/api/auth';

  postRegister() {
    this.http.post(this.rootURL + "/register", this.bodyRegister)
      .subscribe((res) => { console.log(res); });
  }

  postLogin() {
    this.http.post(this.rootURL + "/login", this.bodyLogin, { headers: this.headersLogin })
      .subscribe((res) => { console.log(res); });
  }

  getWhoami() {
    this.http.get(this.rootURL + "/whoami", { headers: this.headersWhoami })
      .subscribe((res) => { console.log(res); });
  }
}