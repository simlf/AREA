import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../models/login.model';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  
  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) { }

  auth_token_login = "";
  // auth_token_whoami = "";
  // headersWhoami = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${this.auth_token_whoami}`
  // });

  headersLogin = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token_login}`
  });

  bodyLogin: login = {
    email: '',
    password: ''
  };

  rootURL = 'http://localhost:8080/api/auth';

  // getWhoami() {
  //   this.http.get(this.rootURL + "/whoami", { headers: this.headersWhoami })
  //     .subscribe((res) => { console.log(res); });
  // }

  postLogin() {
    console.log(this.bodyLogin.email);
    console.log(this.bodyLogin.password);
    this.http.post(this.rootURL + "/login", this.bodyLogin, { headers: this.headersLogin })
      .subscribe((res) => { console.log(res); });
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
