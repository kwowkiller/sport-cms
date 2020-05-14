import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule,
  NzGridModule,
  NzInputModule, NzModalModule, NzRadioModule,
  NzSelectModule, NzSpinModule,
  NzTableModule,
  NzTabsModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SubListComponent} from './sub-list/sub-list.component';
import {ModalData1Component} from './modal-data1/modal-data1.component';
import {ModalData2Component} from './modal-data2/modal-data2.component';
import {ModalData3Component} from './modal-data3/modal-data3.component';

@NgModule({
  declarations: [ListComponent, SubListComponent, ModalData1Component, ModalData2Component, ModalData3Component],
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzTabsModule,
    NzDatePickerModule,
    NzModalModule,
    NzRadioModule,
    NzSpinModule,
  ]
})
export class MatchModule {
}

export interface Match {
  areaName: string;
  area_id: number;
  country_id: number;
  country_name: string;
  id: number;
  level: number;
  logo: string;
  name_en: string;
  name_zh: string;
  name_zht: string;
  short_name_en: string;
  short_name_zh: string;
  short_name_zht: string;
  // 赛事类型 0-未知 1-联赛 2-杯赛 3-友谊赛
  type: number;
}

export interface MatchItem {
  awayTeamId: number;
  awayTeamRed: number;
  eventId: number;
  eventName: string;
  follow: boolean;
  homeTeamId: number;
  homeTeamRed: number;
  id: number;
  middlePosition: number;
  /*
   * 0  比赛异常，说明：暂未判断具体原因的异常比赛，可能但不限于：腰斩、取消等等，可隐藏处理  足球比赛状态
   1  未开赛  足球比赛状态
   2  上半场  足球比赛状态
   3  中场  足球比赛状态
   4  下半场  足球比赛状态
   5  加时赛  足球比赛状态
   6  加时赛(弃用)  足球比赛状态
   7  点球决战  足球比赛状态
   8  完场  足球比赛状态
   9  推迟  足球比赛状态
   10  中断  足球比赛状态
   11  腰斩  足球比赛状态
   12  取消  足球比赛状态
   13  待定  足球比赛状态
   */
  status: number;
  // 左边队名
  homeTeamName: string;
  // 右边队名
  awayTeamName: string;
  matchTime: number;
  teeTime: number;
  matchDescription: string;
  // 主队角
  homeTeamCorner: number;
  // 客队角
  awayTeamCorner: number;
  // 主队半
  homeTeamHalf: number;
  // 客队半
  awayTeamHalf: number;
  // 主队比分
  homeTeamScore: number;
  // 客队比分
  awayTeamScore: number;
  homeTeamYellow: number;
  awayTeamYellow: number;
  homeTeamRank: string;
  awayTeamRank: string;
}
