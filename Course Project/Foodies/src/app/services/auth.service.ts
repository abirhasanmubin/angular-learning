import {HttpClient} from "@angular/common/http";
import {Injectable, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from "../auth/auth-store/auth.actions";


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService implements OnDestroy{

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  ngOnDestroy() {
    this.clearLogoutTimer();
  }

}
