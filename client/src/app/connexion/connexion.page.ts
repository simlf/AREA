import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { login } from '../models/login.model';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Response } from 'express'
import { stat } from 'fs';
import { promises } from 'dns';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
import { rest } from 'lodash';
import { responseLogin, loginRequest } from '../utils/loginRequest';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private router: Router) { }

  bodyLogin = {
    email: '',
    password: ''
  };

  rootURL = 'http://localhost:8080/api/auth';

  async postLogin(): Promise<boolean> {
    let state: boolean = false;
    const login: loginRequest = new loginRequest(this.http, "", "", "");
    const result = await login.postData(this.rootURL + "/login", this.bodyLogin, responseLogin);
    if (result.accessToken != undefined) {
      login.saveData();
      state = true;
    }
    return (state);
  }

  async checkLogin() {
    let response = await this.postLogin()
    console.log("response bool = " + response);
    if (response == false) {
      this.router.navigate(['/connexion']);
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
