import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Category, Tags} from '../../other.module';
import {Result} from '../../../../../common/common.model';

@Component({
  selector: 'app-tags-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Tags> implements OnInit {
  @Input()
  type: 'list' | 'modal' = 'list';
  @Input()
  detail: Category;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'live/sys/tag/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
    if (this.type === 'modal') {
      // this.setOfCheckedId = new Set(this.detail.tagId.split(',').map(i => Number(i)));
    }
  }

  beforeSearch() {
    if (this.type === 'modal') {
      this.search.liveType = this.detail.id;
    }
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

  updateItem(item: Tags) {
    this.http.post<Result>('live/sys/tag/update', {
      sstatus: item.sstatus === 0 ? 1 : 0,
    }).subscribe(event => {
      if (event.code === 200) {
        this.fetchList('none');
        this.message.success('操作成功');
      } else {
        this.message.error(`操作失败：${event.message}`);
      }
    });
  }
}
