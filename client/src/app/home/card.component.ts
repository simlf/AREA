import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, About } from '../models/card.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
    selector: 'integration-list',
    styleUrls: ['./home.page.scss'],
    template: `
    <div class="card-block"
    *ngFor="let card of cards" [ngSwitch]="currentBreakpoint">
        <a href="{{card.url}}">
            <div *ngSwitchCase="Breakpoints.HandsetPortrait" class="card-overlay-Handset" style="background-image: url({{card.img}});">
                <img class="card-logo" src="{{card.logo}}" alt="Card logo">
                <h4 class="card-title">{{card.name}}</h4>
            </div>
            <div *ngSwitchCase="Breakpoints.Web" class="card-overlay-web" style="background-image: url({{card.img}});">
                <img class="card-logo-web" src="{{card.logo}}" alt="Card logo">
                <h4 class="card-title-web">{{card.name}}</h4>
                <p class="card-text">{{card.description}}</p>
            </div>
        </a>
    </div>
`
})

export class IntegrationListComponent {
    cards: Card[];
    Breakpoints = Breakpoints;
    currentBreakpoint: string = '';
    rootURL = 'http://localhost:8080/';
    
    getAbout(){
        this.http.get(this.rootURL + "workflows")
            .subscribe((res) => { 
                this.cards = res as Card[];
                console.log(this.cards);
            });
    }

    constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) {
        this.cards = [];
        this.getAbout();
    }

    readonly breakpoint$ = this.breakpointObserver
        .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
        .pipe(
            tap(value => console.log(value)),
            distinctUntilChanged()
        );


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
