import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {
  NzButtonModule, NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzModalModule,
  NzPopconfirmModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
    ComponentsModule,
    NzPopconfirmModule,
    NzDividerModule,
    DirectiveModule,
  ]
})
export class BannerModule {
}

export interface Banner {
  createTime: string;
  id: number;
  moduleType: number;
  orderNum: number;
  sstatus: number;
  updateTime: string;
  url: string;
  bannerName: string;
  linkUrl: string;
}
