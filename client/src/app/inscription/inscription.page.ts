import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { catchError, distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { register } from '../models/register.model';
import { JwtConfig, JwtInterceptor  } from '@auth0/angular-jwt';
import { empty } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';
  confirmPassword:string = '';
  auth_token_login = '';
  valid:boolean= true;
  state:boolean= true;

  headersLogin = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token_login}`
  });

  bodyRegister: register = {
    username: '',
    password: '',
    email: ''
  };

  rootURL = 'http://localhost:8080/api/auth';

  goToPage(state:boolean) {
    if (state == false) {
      this.router.navigateByUrl('/home');
    }
  }

  postRegister() {
    if (this.bodyRegister.password !== this.confirmPassword) {
      this.valid = false;
    }
    this.http.post(this.rootURL + "/register", this.bodyRegister)
      .subscribe((res) => { console.log(res);
      }, (error) => {
          if (error.status != 200)
            this.state = false;
        }
      );
    this.goToPage(this.state);
    this.state = true;
    this.valid = true;
  }

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private router: Router) { }

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
