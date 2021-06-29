import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from "../auth/auth-store/auth.actions";
import * as RecipeActions from "../recipes/recipes-store/recipe.actions";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false
  private storeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth')
      .pipe(map(authState => {
        return authState.user;
      }))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  onStoreData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
