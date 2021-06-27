import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DropdownDirective} from "./dropdown.directive";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {AlertComponent} from "./alert/alert.component";

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
