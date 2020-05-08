import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../common/table';
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
    private message: NzMessageService,
  ) {
    super(http);
    this.url = 'news/sys/news/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.fetchList('all');
  }

  updateItem(id: number) {
    this.http.put<Result>('news/sys/news/status', {id}).subscribe(event => {
      if (event.code === 200) {
        this.fetchList('none');
        this.message.success('操作成功');
      }
    });
  }
}
