import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../../frame/table';
import {Bar} from '../bar.module';
import {NzMessageService} from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Bar> implements OnInit {
  tabIndex = 0;
  dateRange: Date[] = [];

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'bar/sys/bar/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    // 审核状态
    this.search.approveStatus = this.tabIndex;
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }

  onSubmitSuccess() {
  }
}
