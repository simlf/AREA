import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { integrationComponent } from './card/card.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { workflowRequest, responseWorkflows } from 'src/app/utils/workflowRequest';

@Component({
  selector: 'app-config-integration',
  templateUrl: './config-integration.page.html',
  styleUrls: ['./config-integration.page.scss'],
})
export class ConfigIntegrationPage implements OnInit {

  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  actionName: string = '';
  reactionName: string = '';
  rootURL = 'http://localhost:8080/';
  id: string | null = null;

  ville: string = '';
  temperature: string = '';
  leagueUsername: string = '';
  redditUsername: string = '';
  playlistId: string = '';
  active: boolean = false;
  isActiveTrue: boolean = false;
  isActiveFalse: boolean = false;

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private route: ActivatedRoute) { }

  async getNameActionReaction() {
    const bodyRequest = { "workflowId": this.id };
    const workflow: workflowRequest = new workflowRequest(this.http);
    const result = await workflow.postData(this.rootURL + "workflowsDb/getWorkflow", bodyRequest, responseWorkflows);
    this.actionName = result.actionName;
    this.reactionName = result.reactionName;
    this.active = result.active;
    console.log(this.actionName);
    console.log(this.reactionName);
  }

  // TODO send to server
  sendInput() {
    let bodyRequest: any;
    let lastCheck: boolean = false;
    if (this.actionName == "meteo") {
      bodyRequest = { "workflowId": this.id, "ville": this.ville, "temperature": this.temperature };
    } else if (this.actionName == "league") {
      bodyRequest = { "workflowId": this.id, "leagueUsername": this.leagueUsername };
    } else if (this.actionName == "reddit") {
      bodyRequest = { "workflowId": this.id, "redditUsername": this.redditUsername };
    } else if (this.actionName == "spotify") {
      bodyRequest = { "workflowId": this.id, "playlistId": this.playlistId };
    }
    if (this.active == true) {
      lastCheck = this.isActiveTrue;
    } else if (this.active == false) {
      lastCheck = this.isActiveFalse;
    }
    console.log("body: " + JSON.stringify(bodyRequest)   + "active: " + lastCheck);
  }
  
  ngOnInit(): void {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
    this.id = this.route.snapshot.paramMap.get('id');
    this.getNameActionReaction();
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
