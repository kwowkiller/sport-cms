import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule, NzFormModule,
  NzGridModule, NzIconModule,
  NzInputModule, NzModalModule, NzPopconfirmModule,
  NzRadioModule, NzSelectModule, NzSpinModule,
  NzTableModule, NzTabsModule, NzUploadModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ModalFormComponent} from './modal-form/modal-form.component';
import {ComponentsModule} from '../../../components/components.module';
import {ModalUserComponent} from './modal-user/modal-user.component';
import {DirectiveModule} from '../../../directives/directive.module';
import { AuditListComponent } from './audit-list/audit-list.component';


@NgModule({
  declarations: [ListComponent, ModalFormComponent, ModalUserComponent, AuditListComponent],
  imports: [
    CommonModule,
    NzDividerModule,
    NzTableModule,
    FormsModule,
    NzGridModule,
    NzInputModule,
    NzDatePickerModule,
    NzRadioModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzUploadModule,
    NzIconModule,
    NzTabsModule,
    ComponentsModule,
    NzSelectModule,
    NzSpinModule,
    NzPopconfirmModule,
    DirectiveModule,
  ]
})
export class BarModule {
}

export interface Bar {
  // 审核状态(0:待审核1:审核通过2:拒绝)
  approveStatus: number;
  // 不通过原因
  approveRemark?: string;
  // 球吧名称
  barName: string;
  // 球吧状态(0:开启1:关闭)
  barStatus: number;
  // 帖子是否推荐(0:否1:是)
  isRecommend: number;
  // 球吧分类(0:足球1:篮球2:电竞3:全部)
  barType: number;
  createTime: string;
  // 关注人数
  followCount: number;
  id: number;
  // 发帖数
  postCount: number;
  // 回复数
  replayCount: number;
  updateTime: string;
  userId: number;
  // 吧主昵称
  username: string;
  barLogo: string;
  followTime: string;
  viewCount: number;
}
