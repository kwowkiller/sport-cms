import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule} from '@angular/router';
import {NzButtonModule, NzDatePickerModule, NzDividerModule, NzFormModule, NzGridModule, NzInputModule, NzTableModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDividerModule,
    NzDatePickerModule,
  ]
})
export class BlogModule {
}

export interface Blog {
  barId: number;
  context: string;
  createTime: string;
  id: number;
  isDel: number;
  phone: string;
  postingTitle: string;
  updateTime: string;
  userId: number;
  username: string;
}
