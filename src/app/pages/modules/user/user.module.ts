import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule} from '@angular/router';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule, NzModalModule, NzPopconfirmModule, NzRadioModule,
  NzSelectModule, NzSpinModule,
  NzTableModule, NzTabsModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthListComponent} from './auth-list/auth-list.component';
import {SubListComponent} from './sub-list/sub-list.component';
import {BarListComponent} from './bar-list/bar-list.component';
import {AuthInfoComponent} from './auth-info/auth-info.component';
import {BannedComponent} from './banned/banned.component';
import {DirectiveModule} from '../../../directives/directive.module';
import {PointSettingComponent} from './point-setting/point-setting.component';
import {ExpSettingComponent} from './exp-setting/exp-setting.component';
import {LevelConfigComponent} from './level-config/level-config.component';
import {PointLogComponent} from './point-log/point-log.component';
import {LevelLogComponent} from './level-log/level-log.component';
import {ComponentsModule} from '../../../components/components.module';

@NgModule({
  declarations: [
    ListComponent,
    AuthListComponent,
    SubListComponent,
    BarListComponent,
    AuthInfoComponent,
    BannedComponent,
    PointSettingComponent,
    ExpSettingComponent,
    LevelConfigComponent,
    PointLogComponent,
    LevelLogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ListComponent},
      {path: 'auth', component: AuthListComponent},
      {path: 'level', component: LevelConfigComponent},
    ]),
    NzTableModule,
    NzDividerModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    FormsModule,
    NzModalModule,
    NzRadioModule,
    NzTabsModule,
    NzPopconfirmModule,
    NzSpinModule,
    ReactiveFormsModule,
    NzFormModule,
    DirectiveModule,
    ComponentsModule,
  ]
})
export class UserModule {
}

export interface User {
  authenStatus: number;
  authenTime: string;
  createTime: string;
  fansCount: number;
  followBarCount: number;
  followUserCount: number;
  forbiddenTimes: number;
  headerImg: string;
  id: number;
  lastLoginTime: string;
  password: string;
  phone: string;
  registerDays: number;
  sex: number;
  signature: string;
  updateTime: string;
  userStatus: number;
  username: string;
  // 积分
  points: number;
  // 等级
  levelName: string;
}

export interface AuthInfo {
  // 0未认证 1认证成功 2认证失败
  authStatus: number;
  authTimeFrom: string;
  authTimeTo: string;
  // 用户注册时间
  createTime: string;
  creationTime: string;
  frontPhoto: string;
  handPhoto: string;
  headerImg: string;
  id: number;
  idNo: string;
  nikeName: string;
  phone: string;
  realName: string;
  remark: string;
  sex: number;
  userId: number;
  versoPhoto: string;
  authenTime: string;
  fansCount: number;
  followBarCount: number;
  registerDays: number;
  signature: string;
  username: string;
  levelId: string;
}

export interface LevelConfig {
  createTime: string;
  fromExpireValue: number;
  id: number;
  levelImage: string;
  levelName: string;
  toExpireValue: number;
}
