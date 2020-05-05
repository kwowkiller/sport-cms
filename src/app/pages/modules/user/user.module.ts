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
  NzInputModule, NzModalModule, NzRadioModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthListComponent} from './auth-list/auth-list.component';

@NgModule({
  declarations: [ListComponent, AuthListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ListComponent},
      {path: 'auth', component: AuthListComponent},
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
}

export interface Auth {
  authStatus: number;
  authTimeFrom: string;
  authTimeTo: string;
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
}
