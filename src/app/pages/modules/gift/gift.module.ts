import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GitfListComponent} from './gitf-list/gitf-list.component';
import {NzButtonModule, NzFormModule, NzTableModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    GitfListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: GitfListComponent},
    ]),
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    FormsModule
  ]
})
export class GiftModule {
}
