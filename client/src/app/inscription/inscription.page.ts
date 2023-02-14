import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { catchError, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { register } from '../models/register.model';
import { JwtConfig, JwtInterceptor } from '@auth0/angular-jwt';
import { empty } from 'rxjs';
import { Router } from '@angular/router';
import { Interface } from 'readline';
import { loginRequest, responseLogin } from '../utils/loginRequest';
import { registerRequest, responseRegister } from '../utils/registerRequest';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private router: Router) { }

  confirmPassword: string = '';

  bodyRegister: register = {
    username: '',
    password: '',
    email: ''
  };


  rootURL = 'http://localhost:8080/api/auth';

  async postRegister(): Promise<boolean> {
    let state: boolean = false;
    const register: registerRequest = new registerRequest(this.http);
    const resultRegister = await register.postData(this.rootURL + "/register", this.bodyRegister, responseRegister);
    if (JSON.stringify(resultRegister).includes("400 Bad Request") == false) {
      const bodyLogin = {
        email: this.bodyRegister.email,
        password: this.bodyRegister.password
      };
      const login: loginRequest = new loginRequest(this.http);
      const result = await login.postData(this.rootURL + "/login", bodyLogin, responseLogin);
      if (result.accessToken != undefined) {
        login.saveData();
        state = true;
      }
    }
    return state;
  }

  async checkRegister() {
    let response = await this.postRegister()
    if (response == false) {
      this.router.navigate(['/inscription']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.Web)) {
      this.currentBreakpoint = Breakpoints.Web;
    } else if (this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait)) {
      this.currentBreakpoint = Breakpoints.HandsetPortrait;
    } else if (this.breakpointObserver.isMatched(Breakpoints.TabletPortrait)) {
      this.currentBreakpoint = Breakpoints.HandsetPortrait;
    }
  }
}
