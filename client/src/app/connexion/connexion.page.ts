/**
 * @file ConnexionPage
 * @author [Author Name]
 * @date [Date]
 * @brief Component class for ConnexionPage in Angular
 */

import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, distinctUntilChanged } from 'rxjs/operators';

import { loginRequest, responseLogin } from '../utils/loginRequest';
import { whoamiRequest } from '../utils/whoamiRequest';

/**
 * @class ConnexionPage
 * @brief Component for handling connexion logic in Angular
 */
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';

  /**
   * Observable for breakpoint changes
   */
  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  /**
   * @brief Constructor for ConnexionPage
   * @param breakpointObserver instance of BreakpointObserver
   * @param http instance of HttpClient for sending HTTP requests
   * @param router instance of Router for navigation
   */
  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private router: Router) { }

  /**
   * Body for login request
   */
  bodyLogin = {
    email: '',
    password: ''
  };

  rootURL = 'http://localhost:8080/auth';

  /**
   * @brief Asynchronous function for posting login data
   * @return boolean indicating success or failure of login
   */
  async postLogin(): Promise<boolean> {
    let state: boolean = false;
    const login: loginRequest = new loginRequest(this.http);
    const result = await login.postData(this.rootURL + "/login", this.bodyLogin, responseLogin);
    if (result.accessToken != undefined) {
      login.saveData();
      state = true;
    }
    return (state);
  }

  /**
   * @brief Asynchronous function for checking login status
   */
  async checkLogin() {
    let response = await this.postLogin()
    console.log("response bool = " + response);
    if (response == false) {
      this.router.navigate(['/connexion']);
    } else {
      this.router.navigate(['/home']);
    }
  } 

  /**
   * @method ngOnInit
   * @description Method called when component is initialized.
   */
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

  /**
   * @method breakpointChanged
   * @private
   * @description Method to handle breakpoint changes.
   */
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
