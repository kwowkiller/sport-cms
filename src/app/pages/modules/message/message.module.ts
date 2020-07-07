import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  NzButtonModule, NzCheckboxModule,
  NzDatePickerModule, NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule, NzRadioModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListComponent} from './list/list.component';
import {FormComponent} from './form/form.component';
import {ComponentsModule} from '../../../components/components.module';
import {DirectiveModule} from '../../../directives/directive.module';


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
    DirectiveModule,
    NzRadioModule,
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
  // 用户类型0:全部1:主播用户2:方案用户
  type: number;
  userId: number;
  levelId: string;
  nickname: string;
  size: number;
  // 触发类型(0帖子,1帖子评论)
  triggerType: number;
}
