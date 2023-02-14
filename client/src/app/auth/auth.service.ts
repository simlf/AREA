import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { whoamiRequest } from '../utils/whoamiRequest';
import { HttpClient } from '@angular/common/http';
import { promises } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class checkRegister {

  constructor(public http: HttpClient) { }

  public async isLoggedIn(): Promise<boolean> {
    const token = "";
    const whoami = new whoamiRequest(this.http);
    if (await whoami.isUser() == true)
      return true;
    else
      return false;
  }
}
