import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule, NzFormModule,
  NzGridModule,
  NzInputModule, NzModalModule, NzPopconfirmModule,
  NzSelectModule, NzSpinModule,
  NzTableModule
} from 'ng-zorro-antd';
import {ModalFormComponent} from './modal-form/modal-form.component';
import {TagSelectComponent} from './tag-select/tag-select.component';
import {ComponentsModule} from '../../../components/components.module';

@NgModule({
  declarations: [ListComponent, ModalFormComponent, TagSelectComponent],
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
      {path: '', component: ListComponent},
    ]),
    NzButtonModule,
    NzDatePickerModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    ComponentsModule,
    NzSpinModule,
    NzPopconfirmModule,
  ]
})
export class LiveModule {
}

export interface Live {
  createTime: string;
  id: number;
  lastStartTime: string;
  liveFaceImage: string;
  // 直播状态(0:未开播,1:直播中,2:已结束)
  liveStatus: number;
  liveTag: number;
  liveTime: number;
  liveTitle: string;
  // 直播分类 0:足球1:篮球2:电竞3:全部
  liveType: number;
  liveUrl: string;
  // 订阅人数
  reseveUsers: number;
  // 开播时间
  startTime: string;
  // 总直播时长(分钟)
  totalLiveTime: number;
  // 总观看人数
  totalLiveUsers: number;
  userId: number;
  // 观看人数
  viewUsers: number;
}

export interface LiveTag {
  id: number;
  liveType: number;
  orderNum: number;
  sstatus: number;
  tag: string;
  updateTime: string;
}
