import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Banner} from '../banner.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-banner-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Banner> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'news/sys/banner/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.message.success('保存成功');
    this.fetchList('all');
  }

  updateItem(id: number, sstatus: number) {
    this.http.put<Result>('news/sys/banner/change', {
      id, sstatus
    }).subscribe(event => {
      if (event.code === 200) {
        this.message.success('操作成功');
        this.fetchList();
      } else {
        this.message.error('操作失败');
      }
    });
  }

  onDelete() {
    this.deleteUrl = `news/sys/banner/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }
}
