import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent as TVList} from './tv/list/list.component';
import {ListComponent as LiveList} from './live/list/list.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule, NzFormModule,
  NzGridModule,
  NzInputModule, NzModalModule, NzPopconfirmModule, NzRadioModule,
  NzSelectModule, NzSpinModule,
  NzTableModule, NzTabsModule
} from 'ng-zorro-antd';
import {ModalFormComponent} from './tv/modal-form/modal-form.component';
import {TagSelectComponent} from './tag-select/tag-select.component';
import {ComponentsModule} from '../../../components/components.module';
import {AudienceComponent} from './audience/audience.component';
import {SetUserComponent} from './set-user/set-user.component';

@NgModule({
  declarations: [TVList, LiveList, ModalFormComponent, TagSelectComponent, AudienceComponent, SetUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'tv', component: TVList},
      {path: 'live', component: LiveList},
    ]),
    FormsModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzDatePickerModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    ComponentsModule,
    NzSpinModule,
    NzPopconfirmModule,
    NzTabsModule,
    NzRadioModule,
  ]
})
export class LiveModule {
}

// TV
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
  // 标签名
  tag: string;
}

export interface LiveTag {
  id: number;
  liveType: number;
  orderNum: number;
  sstatus: number;
  tag: string;
  updateTime: string;
}

// 直播
export interface Live2 {
  id: number;
  createTime: string;
  fromTime: string;
  headerImg: string;
  hostId: number;
  hostType: number;
  lengthOfTime: number;
  liveImg: string;
  liveTitle: string;
  phone: string;
  sex: number;
  sstatus: number;
  username: string;
}
