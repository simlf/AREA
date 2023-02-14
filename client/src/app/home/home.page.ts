import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { whoamiRequest } from '../utils/whoamiRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit {

  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private http: HttpClient) { }
  items = { ...localStorage };

  logout() {
    localStorage.clear();
    this.router.navigate(['/landingpage']);
  }
  async ngOnInit() {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
    const check = new whoamiRequest(this.http);
    const res = await check.isUser();
    if (res == false) {
      this.logout();
      this.router.navigate(['landingpage']);
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
