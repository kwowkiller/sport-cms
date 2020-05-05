import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule,
  NzGridModule,
  NzInputModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    FormsModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzDividerModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzButtonModule,
    NzDatePickerModule,
  ]
})
export class LiveModule {
}

export interface Live {
  id: number;
}
