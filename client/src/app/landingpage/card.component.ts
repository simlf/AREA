import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
    selector: 'integration-list',
    styleUrls: ['./landingpage.page.scss'],
    template: `
    <div class="thecard" *ngFor="let card of cards" [ngSwitch]="currentBreakpoint">
        <div class="thefront">
            <img src="../../assets/logoBrawlstar.png" alt="img" class="imgBrawl">
        </div>
        <div class="theback">
            <p class="description">{{card.description}}</p>
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
                workflowName: "Brawlstar",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/1.png",
                logo: "../../assets/logoBrawlstar.png",
                url: "lolo"
            },
            {
                workflowName: "Meteo",
                description: "super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/1.png",
                logo: "../../assets/logoBrawlstar.png",
                url: "lolo"

            },
            {
                workflowName: "Nasa",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/1.png",
                logo: "../../assets/logoBrawlstar.png",
                url: "lolo"
            },
            {
                workflowName: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/1.png",
                logo: "../../assets/logoBrawlstar.png",
                url: "lolo"
            },
            {
                workflowName: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/1.png",
                logo: "../../assets/logoBrawlstar.png",
                url: "lolo"
            },
            {
                workflowName: "spotify",
                description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
                img: "../../assets/1.png",
                logo: "../../assets/logoBrawlstar.png",
                url: "lolo"
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
