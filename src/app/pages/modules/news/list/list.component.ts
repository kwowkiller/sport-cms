import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {News} from '../news.module';
import {HttpClient} from '@angular/common/http';
import {Result} from '../../../../common/common.model';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-news-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<News> implements OnInit {
  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'news/sys/news/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.fetchList('none');
    this.message.success('操作成功');
  }

  updateItem(id: number) {
    this.http.put<Result>('news/sys/news/status', {id}).subscribe(event => {
      if (event.code === 200) {
        this.fetchList('none');
        this.message.success('操作成功');
      }
    });
  }

  onDelete() {
    this.deleteUrl = `news/sys/news/delete/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }

  // 设为推荐
  updateItemRecommend(item: News) {
    this.http.put<Result>(`news/sys/news/setup/${item.id}`, {}).subscribe(event => {
      if (event.code === 200) {
        this.fetchList('none');
        this.message.success('操作成功');
      }
    });
  }
}
