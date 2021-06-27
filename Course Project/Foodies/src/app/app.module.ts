import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { AlertComponent } from './shared/alert/alert.component';
import {RecipesModule} from "./recipes/recipes.module";
import {RecipesRoutingModule} from "./recipes/recipes-routing.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    RecipesRoutingModule,
    ShoppingListModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
