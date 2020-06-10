import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Category} from '../../other.module';
import {Result} from '../../../../../common/common.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Category> implements OnInit {
  tabIndex = 0;
  moduleType = 0;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'live/sys/liveType/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    this.search.moduleType = this.moduleType;
  }

  onSubmitSuccess() {
    this.message.success('操作成功');
    this.fetchList('all');
  }

  onDelete() {
    this.deleteUrl = `live/sys/liveType/delete/${Array.from(this.setOfCheckedId).join(',')}`;
    this.deleteItem();
  }

  updateItem(item: Category) {
    this.http.get<Result>(`live/sys/liveType/change`, {
      params: {
        id: item.id.toString(),
        sStatus: item.sstatus === 0 ? '1' : '0',
      }
    }).subscribe(event => {
      if (event.code === 200) {
        this.message.success('操作成功');
        this.fetchList('none');
      } else {
        this.message.error('操作失败');
      }
    });
  }
}
