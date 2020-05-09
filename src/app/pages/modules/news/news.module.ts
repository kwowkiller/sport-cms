import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule,
  NzSelectModule, NzSpinModule,
  NzTableModule
} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {ModalFormComponent} from './modal-form/modal-form.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ComponentsModule} from '../../../components/components.module';


@NgModule({
  declarations: [ListComponent, ModalFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzDividerModule,
    NzTableModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    CKEditorModule,
    ComponentsModule,
    NzSpinModule,
    NzPopconfirmModule,
  ]
})
export class NewsModule {
}

export interface News {
  // 资讯作者
  author: string;
  // 资讯内容
  content: string;
  createTime: string;
  id: number;
  isDel: number;
  // 是否推荐(0:否1:是)
  isRecommend: number;
  // 点赞数
  like: number;
  // 封面
  newsImg: string;
  // 资讯标题
  newsTitle: string;
  // 发布时间
  publishDate: string;
  // 发布状态(0:待发布1:已发布2:已下架)
  publishStatus: number;
  // 推荐顺序
  recommendOrderNum: number;
  // 分享数
  share: number;
  // 资讯类型
  typeId: number;
  typeName: string;
  updateTime: string;
  // 浏览量
  visits: number;
  // 评论数
  commentnum: number;
}

// 下拉框数据
export interface NewsType {
  id: number;
  isDel: number;
  newsTypeName: string;
}
