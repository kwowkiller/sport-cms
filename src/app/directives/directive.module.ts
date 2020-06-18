import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorityDirective} from './authority.directive';
import {CopyDirective} from './copy.directive';

@NgModule({
  declarations: [
    AuthorityDirective,
    CopyDirective,
  ],
  exports: [
    AuthorityDirective,
    CopyDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule {
}
