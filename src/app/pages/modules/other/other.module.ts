import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule, NzRadioModule,
  NzSelectModule,
  NzTableModule, NzTabsModule, NzToolTipModule, NzUploadModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ListComponent as WordList} from './word/list.component';
import {ListComponent as HelpList} from './help/list.component';
import {FormComponent as HelpForm} from './help/form.component';
import {FormComponent as WordForm} from './word/form.component';
import {ListComponent as TagsList} from './category/tags/list.component';
import {ComponentsModule} from '../../../components/components.module';
import {FormComponent as TagForm} from './category/tags/form.component';
import {DirectiveModule} from '../../../directives/directive.module';
import {ListComponent as CategoryList} from './category/list/list.component';
import {FormComponent as CategoryForm} from './category/form/form.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackDetailComponent } from './feedback/feedback-detail/feedback-detail.component';

@NgModule({
  declarations: [
    WordList,
    HelpList,
    HelpForm,
    WordForm,
    TagsList,
    TagForm,
    CategoryList,
    CategoryForm,
    FeedbackComponent,
    FeedbackDetailComponent,
  ],
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
      {path: 'category', component: CategoryList},
      {path: 'feedback', component: FeedbackComponent},
    ]),
    NzDividerModule,
    NzPopconfirmModule,
    ComponentsModule,
    NzToolTipModule,
    NzUploadModule,
    DirectiveModule,
    NzTabsModule,
    NzRadioModule,
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

// 导航分类
export interface Category {
  createTime: string;
  id: number;
  moduleType: number;
  orderNum: number;
  sstatus: number;
  tagId: string;
  tagName: string;
  typeName: string;
  updateTime: string;
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
