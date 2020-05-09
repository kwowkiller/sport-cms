import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {Blog} from '../blog.module';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-blog-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Blog> implements OnInit {
  dateRange: Date[] = [];

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
  }

  onSubmitSuccess() {
  }

  onDelete() {
  }
}
