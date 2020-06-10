import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../../frame/table';
import {NewsType} from '../news.module';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-news-category-list',
  templateUrl: './category.component.html',
  styles: []
})
export class CategoryComponent extends Table<NewsType> implements OnInit {

  constructor(protected http: HttpClient, protected message: NzMessageService) {
    super(http, message);
    this.listUrl = 'news/sys/news/type';
  }

  format(item: any) {
    return item as NewsType;
  }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList(reset: 'all' | 'page' | 'none' = 'none') {
    this.http.get<{ code: number, data: NewsType[] }>(this.listUrl).subscribe(event => {
      this.list = event.data;
    });
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.message.success('操作成功');
    this.fetchList();
  }

  onDelete() {
    this.deleteUrl = `news/sys/type/delete/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }
}
