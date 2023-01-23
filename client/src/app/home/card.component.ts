import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
    selector: 'integration-list',
    styleUrls: ['./home.page.scss'],
    template: `
    <div class="card-block"
        *ngFor="let card of cards" [ngSwitch]="currentBreakpoint">
        <div *ngSwitchCase="Breakpoints.HandsetPortrait" class="card-overlay-Handset" style="background-image: url({{card.img}});">
            <img class="card-logo" src="{{card.logo}}" alt="Card logo">
            <h4 class="card-title">{{card.name}}</h4>
        </div>
        <div *ngSwitchCase="Breakpoints.Web" class="card-overlay-web" style="background-image: url({{card.img}});">
            <img class="card-logo-web" src="{{card.logo}}" alt="Card logo">
            <h4 class="card-title-web">{{card.name}}</h4>
            <p class="card-text">{{card.description}}</p>
        </div>
    </div>
`
})

export class IntegrationListComponent {
    cards: Card[];
    Breakpoints = Breakpoints;
    currentBreakpoint: string = '';

    constructor(private breakpointObserver: BreakpointObserver) {
        this.cards = [
            {
                name: "Brawlstar",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/blueBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "Meteo",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/blueBackground.png",
                logo: "../../assets/logoBrawlstar.png"

            },
            {
                name: "Nasa",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/blueBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/redBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/redBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/redBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "Brawlstar",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/blueBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "Meteo",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/blueBackground.png",
                logo: "../../assets/logoBrawlstar.png"

            },
            {
                name: "Nasa",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/blueBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/redBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/redBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
            {
                name: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/redBackground.png",
                logo: "../../assets/logoBrawlstar.png"
            },
        ];
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
