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
  NzInputModule, NzPaginationModule, NzPopconfirmModule, NzSpinModule,
  NzTableModule,
  NzTabsModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../../components/components.module';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';


@NgModule({
  declarations: [ListComponent, BlogDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzTableModule,
    NzGridModule,
    NzInputModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDividerModule,
    NzDatePickerModule,
    ComponentsModule,
    NzTabsModule,
    NzPopconfirmModule,
    NzPaginationModule,
    NzSpinModule,
  ]
})
export class BlogModule {
}

export interface Blog {
  barId: number;
  barName: string;
  context: string;
  createTime: string;
  id: number;
  isDel: number;
  phone: string;
  postingTitle: string;
  updateTime: string;
  userId: number;
  username: string;
  commentCount: number;
  likeCount: number;
  shareCount: number;
  //  帖子是否推荐(0:否1:是)
  isRecommend: number;
}
