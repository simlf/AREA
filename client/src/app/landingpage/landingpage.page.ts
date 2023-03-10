import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { whoamiRequest } from '../utils/whoamiRequest';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.page.html',
  styleUrls: ['./landingpage.page.scss'],
})
export class LandingpagePage implements OnInit {

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private router: Router) { }

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
