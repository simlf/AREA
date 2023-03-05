import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-integration',
  templateUrl: './create-integration.page.html',
  styleUrls: ['./create-integration.page.scss'],
})
export class CreateIntegrationPage implements OnInit {
  
  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';
  selectAction = '';
  selectReaction = '';
  isActive: boolean = false;
  description: string = '';
  workflowName: string = '';

	onSelectedAction(value:string): void {
		this.selectAction = value;
	}

	onSelectedReaction(value:string): void {
		this.selectReaction = value;
	}

  
  readonly breakpoint$ = this.breakpointObserver
  .observe([Breakpoints.Web, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
  .pipe(
    tap(value => console.log(value)),
    distinctUntilChanged()
    );
    
    constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) { }
    
    async sendWorkflow(): Promise<void> {
      const logo = this.selectAction + ".png"
      const id = localStorage.getItem('auth_id');
      const bodyRequest = { "actionName": this.selectAction, "reactionName": this.selectReaction, "workflowName": this.workflowName, "description": this.description, "userId": id, "logo": logo, "isActive": this.isActive };
      const res = await this.http.post('http://localhost:8080/workflowsDb/addWorkflow', bodyRequest).toPromise();
      console.log(res);
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
