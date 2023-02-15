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
import { whoamiRequest } from '../utils/whoamiRequest';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  rootURL = 'http://localhost:8080/auth/';
  userExist: boolean = false;

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private router: Router) { }

  async postRegister(): Promise<boolean> {
    let state: boolean = false;
    const bodyRegister = {
      email: this.email,
      password: this.password
    };
    const register: registerRequest = new registerRequest(this.http);
    const resultRegister = await register.postData(this.rootURL + "register", bodyRegister, responseRegister);

    if (JSON.stringify(resultRegister).includes("400 Bad Request") == false) {
      console.log("User not found, creating new user");

      const bodyLogin = {
        email: this.email,
        password: this.password
      };
      const login: loginRequest = new loginRequest(this.http);
      const result = await login.postData(this.rootURL + "login", bodyLogin, responseLogin);

      if (result.accessToken != undefined) {
        console.log("User successfully created and logged in");
        login.saveData();
        state = true;
      }
    } else {
      console.log("User already exists");
      this.userExist = true;
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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  onSubmit(form: any) {
    if (this.emailFormControl.valid && this.passwordFormControl.valid && this.password === this.confirmPassword) {
      this.checkRegister();
    } else {
      console.log("Invalid form");
    }
  }


  async ngOnInit() {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
    if (typeof(localStorage.getItem('auth_token')) === 'string') {
      const check = new whoamiRequest(this.http);
      const res = await check.isUser();
      if (res == true) {
        this.router.navigate(['home']);
      } else {
        localStorage.clear();
      }
    }
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
