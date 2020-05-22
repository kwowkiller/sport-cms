import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule,
  NzSelectModule,
  NzTableModule, NzToolTipModule, NzUploadModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ListComponent as WordList} from './word/list.component';
import {ListComponent as HelpList} from './help/list.component';
import {FormComponent as HelpForm} from './help/form.component';
import {FormComponent as WordForm} from './word/form.component';
import {ListComponent as TagsList} from './tags/list.component';
import {ComponentsModule} from '../../../components/components.module';
import {FormComponent as TagForm} from './tags/form.component';

@NgModule({
  declarations: [WordList, HelpList, HelpForm, WordForm, TagsList, TagForm],
  imports: [
    CommonModule,
    NzTableModule,
    NzGridModule,
    NzInputModule,
    FormsModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    RouterModule.forChild([
      {path: 'word', component: WordList},
      {path: 'help', component: HelpList},
      {path: 'tags', component: TagsList},
    ]),
    NzDividerModule,
    NzPopconfirmModule,
    ComponentsModule,
    NzToolTipModule,
    NzUploadModule,
  ]
})
export class OtherModule {
}

// 敏感词
export interface Word {
  createTime: string;
  id: number;
  sstatus: number;
  word: string;
}

// 帮助问题
export interface Help {
  answer: string;
  createTime: string;
  // 问题状态(0:上架1:下架)
  fdStatus: number;
  id: number;
  imageUrl: string;
  orderNum: number;
  title: string;
}

export interface Tags {
  createTime: string;
  id: number;
  liveType: number;
  orderNum: number;
  moduleType: number;
  sstatus: number;
  tag: string;
  updateTime: string;
}
