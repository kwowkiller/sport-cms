import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuditListComponent} from './audit-list/audit-list.component';
import {SchemeListComponent} from './scheme-list/scheme-list.component';
import {SchemeUserComponent} from './scheme-user/scheme-user.component';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule,
  NzRadioModule, NzSelectModule,
  NzTableModule,
  NzTabsModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SchemeDetailComponent} from './scheme-detail/scheme-detail.component';
import {PurchaseRecordComponent} from './purchase-record/purchase-record.component';
import {SchemeHistoryComponent} from './scheme-history/scheme-history.component';

@NgModule({
  declarations: [
    AuditListComponent,
    SchemeListComponent,
    SchemeUserComponent,
    SchemeDetailComponent,
    PurchaseRecordComponent,
    SchemeHistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'audit', component: AuditListComponent},
      {path: 'list', component: SchemeListComponent},
      {path: 'user', component: SchemeUserComponent},
    ]),
    NzFormModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzTabsModule,
    NzSelectModule,
    NzPopconfirmModule,
  ]
})
export class SchemeModule {
}

export interface Scheme {
  id: number;
  // 分析内容
  anAlyze: string;
  awayLogo: string;
  awayName: string;
  buyCount: string;
  compLogo: string;
  compName: string;
  count: number;
  createTime: string;
  endTime: string;
  fallCount: number;
  // 游戏类型1:北单胜负过关2:北单胜平负
  gameType: number;
  headerImg: string;
  history: string;
  // 0:未核准1命中,2未中
  hit: number;
  homeLogo: string;
  homeName: string;
  // 是否收费0不收费1收费
  isCharge: number;
  isFollow: number;
  // 是否精选0否 1是
  isGood: number;
  // 彩票id
  lotteryId: number;
  // 比赛id
  matchId: number;
  // 比赛名称
  matchName: string;
  // 比赛状态(不填全部,1未开赛,2进行中,3已结束,4其他)
  matchStatus: number;
  matchTime: string;
  // 1:足球2:篮球
  matchType: number;
  // 费用
  money: number;
  nickname: string;
  // 选中胜负过关主1,客2胜平负位置6个
  position: number;
  remark: string;
  // 返还率
  returnRate: number;
  startTime: string;
  tag: string;
  // 标题
  title: string;
  userId: number;
  username: string;
  winCount: number;
  winRate: number;
  // 连胜
  winTag: string;
  // 命中
  hitTag: string;
}

export interface SchemeUser {
  winTag: string;
  hitTag: string;
  endTime: string;
  headerImg: string;
  history: string;
  levelId: number;
  nickname: string;
  phone: string;
  // 0不禁止 1禁止
  pushStatus: number;
  pushTime: string;
  returnRate: number;
  serialTag: string;
  sex: number;
  startTime: string;
  statusTag: string;
  userId: number;
  winRate: number;
}
