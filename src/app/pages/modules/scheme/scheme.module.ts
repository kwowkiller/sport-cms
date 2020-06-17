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
  NzModalModule,
  NzRadioModule,
  NzTableModule,
  NzTabsModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SchemeDetailComponent } from './scheme-detail/scheme-detail.component';
import { PurchaseRecordComponent } from './purchase-record/purchase-record.component';
import { SchemeHistoryComponent } from './scheme-history/scheme-history.component';

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
  ]
})
export class SchemeModule {
}
