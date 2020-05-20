import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {Blog} from '../blog.module';
import {NzMessageService} from 'ng-zorro-antd';
import * as moment from 'moment';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Blog> implements OnInit {
  dateRange: Date[] = [];
  tabIndex = 1;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'bar/sys/postings/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }

  onSubmitSuccess() {
  }

  onDelete() {
    this.http.put<Result>('bar/sys/postings/change', {
      isDel: 1,
      id: Array.from(this.setOfCheckedId.values()).join(','),
    }).subscribe(event => {
      if (event.code === 200) {
        this.message.success('删除成功');
        this.fetchList();
        this.setOfCheckedId.clear();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  // 设为推荐
  updateItem(id: number, status: number) {
    this.http.put<Result>(`bar/sys/postings/recommend/${id}/${status}`, {}).subscribe(event => {
      if (event.code === 200) {
        this.message.success('操作成功');
        this.fetchList();
      } else {
        this.message.error('操作失败');
      }
    });
  }
}
