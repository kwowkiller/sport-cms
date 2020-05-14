import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Help} from '../other.module';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-help-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Help> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'app/sys/feedback/list';
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

  onDelete() {
    this.deleteUrl = `app/sys/feedback/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }

  updateItem(id: number, dlStatus: number) {
    this.http.put<Result>('app/sys/feedback/change', {
      id, dlStatus,
    }).subscribe(event => {
      if (event.code === 200) {
        this.message.success('操作成功');
        this.fetchList();
      } else {
        this.message.error('操作失败');
      }
    });
  }
}
