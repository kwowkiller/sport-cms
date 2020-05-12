import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  NzButtonModule, NzCheckboxModule,
  NzDatePickerModule, NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListComponent} from './list/list.component';
import {FormComponent} from './form/form.component';
import {ComponentsModule} from '../../../components/components.module';


@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzTableModule,
    NzGridModule,
    NzInputModule,
    FormsModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDatePickerModule,
    NzCheckboxModule,
    ComponentsModule,
    NzDividerModule,
    NzPopconfirmModule,
  ]
})
export class MessageModule {
}

export interface Message {
  commentId: number;
  content: string;
  creationTime: string;
  headImg: string;
  id: number;
  nikeName: string;
  sendTime: string;
  // 消息状态(0，待发送，1未读取，2已读取)
  status: number;
  triggerUserId: number;
  type: number;
  userId: number;
}
