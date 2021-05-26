import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface CanCompponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


export class CanDeactivateGuard implements CanDeactivate<CanCompponentDeactivate>{
  canDeactivate(
    component: CanCompponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
