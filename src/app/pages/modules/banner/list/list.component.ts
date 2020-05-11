import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Banner} from '../banner.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

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
    this.listUrl = 'banner列表接口';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
