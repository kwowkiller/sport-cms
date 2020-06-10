import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Tags} from '../../other.module';

@Component({
  selector: 'app-tags-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Tags> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'live/sys/tag/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.fetchList('all');
    this.message.success('操作成功');
  }

  onDelete() {
    this.deleteUrl = `live/sys/tag/delete/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }

  onDeleteSingle(id: number) {
    this.deleteUrl = `live/sys/tag/delete/${id}`;
    this.deleteItem();
  }

}
