import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { integration } from 'src/app/models/integration.model';

@Component({
  selector: 'app-card',
  styleUrls: ['./card.component.scss'],
  template: `
  <div class="card-block" *ngFor="let card of integration" [ngSwitch]="currentBreakpoint">
  <div *ngSwitchCase="Breakpoints.HandsetPortrait" class="card-overlay-Handset handset"
    style="background-image: url({{card.img}});">
    <h4 class="card-title">{{card.name}}</h4>
    <div *ngIf="card.connect; else templateName">
      <img src="../../assets/connect.png" alt="connect logo" class="logoConnect mobile">
    </div>
      <ng-template #templateName>
      <div class="card-button">
      <a href="{{card.oauth}}"> connexion </a>
    </div>
    </ng-template>
  </div>
  <div *ngSwitchCase="Breakpoints.Web" class="card-overlay-web web" style="background-image: url({{card.img}});">
    <img class="card-logo-web" src="{{card.logo}}" alt="Card logo">
    <h4 class="card-title-web">{{card.name}}</h4>
    <p class="card-text">{{card.description}}</p>
    <div *ngIf="card.connect; else templateName">
    <img src="../../assets/connect.png" alt="connect logo" class="logoConnect">
    </div>
    <ng-template #templateName>
    <div class="card-button deskopt">
      <a href="{{card.oauth}}"> connexion </a>
    </div>
    </ng-template>
  </div>
</div>
  `,
})
export class integrationComponent implements OnInit {

  integration: integration[];
  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.integration = [
      {
        name: "Brawlstar",
        description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
        img: "../../assets/blueBackground.png",
        logo: "../../assets/logoBrawlstar.png",
        connect: true
      },
      {
        name: "Brawlstar",
        description: "Une super integration vous permetant de tweeter automatiquement vos explois sur brawlstar ",
        img: "../../assets/blueBackground.png",
        logo: "../../assets/logoBrawlstar.png",
        connect: false
      },
    ];
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