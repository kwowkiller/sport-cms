import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {List1Component} from './list1/list1.component';
import {List2Component} from './list2/list2.component';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule,
  NzFormModule,
  NzInputModule, NzModalModule, NzPopconfirmModule, NzRadioModule,
  NzSelectModule, NzSpinModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalDataComponent} from './modal-data/modal-data.component';
import {AuthInfoComponent} from './auth-info/auth-info.component';
import {ModalActionComponent} from './modal-action/modal-action.component';
import {ModalFormComponent} from './modal-form/modal-form.component';
import {ComponentsModule} from '../../../components/components.module';
import {DirectiveModule} from '../../../directives/directive.module';
import {ModalSetting1Component} from './modal-setting1/modal-setting1.component';
import {ModalSetting2Component} from './modal-setting2/modal-setting2.component';

@NgModule({
  declarations: [List1Component, List2Component, ModalDataComponent, AuthInfoComponent, ModalActionComponent, ModalFormComponent, ModalSetting1Component, ModalSetting2Component],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // 审核列表
      {path: 'list1', component: List1Component},
      // 主播列表
      {path: 'list2', component: List2Component},
    ]),
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    FormsModule,
    NzDatePickerModule,
    NzDividerModule,
    NzModalModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzSpinModule,
    ComponentsModule,
    NzPopconfirmModule,
    DirectiveModule,
  ]
})
export class AnchorModule {
}

// 主播认证信息
export interface AnchorAudit {
  approveTime: string;
  createTime: string;
  fansCount: number;
  headerImg: string;
  id: number;
  phone: string;
  sex: string;
  // 0:待审核1:审核成功2:审核失败
  sstatus: number;
  userFollowCount: number;
  userId: number;
  username: string;
  nickname: string;
  levelId: number;
  levelName: string;
}

// 主播列表
export interface Anchor {
  // 主播状态(0:正常1:禁播)
  sstatus: number;
  createTime: string;
  //   当前观看人数
  currentViews: number;
  //   粉丝数
  fansCount: number;
  followUserCount: number;
  forbiddenFrom: string;
  forbiddenTo: string;
  headerImg: string;
  //  主播等级
  hostLevel: number;
  hostLiveId: number;
  hostTag: number;
  // 直播分类(0:足球1:篮球2:电竞3:全部)
  hostType: number;
  id: number;
  isSubscribe: number;
  //  上次直播时间
  lastStartTime: string;
  liveImg: string;
  // 主播状态(0:未播1:直播中)
  liveStatus: number;
  liveTitle: string;
  liveUrl: string;
  phone: string;
  securityKey: string;
  sex: number;
  totalViews: number;
  //   主播昵称
  username: string;
  roomId: string;
  levelId: number;
  levelName: string;
}
