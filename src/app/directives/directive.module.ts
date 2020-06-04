import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorityDirective} from "./authority.directive";

@NgModule({
  declarations: [
    AuthorityDirective
  ],
  exports: [
    AuthorityDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule { }
