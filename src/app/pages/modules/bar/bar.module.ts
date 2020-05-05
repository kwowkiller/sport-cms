import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule,
  NzGridModule,
  NzInputModule,
  NzRadioModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    NzDividerModule,
    NzTableModule,
    FormsModule,
    NzGridModule,
    NzInputModule,
    NzDatePickerModule,
    NzRadioModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzButtonModule,
  ]
})
export class BarModule {
}

export interface Bar {
  id: number;
}
