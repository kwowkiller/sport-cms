import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Anchor} from '../anchor.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-anchor-list2',
  templateUrl: './list2.component.html',
  styles: []
})
export class List2Component extends Table<Anchor> implements OnInit {
  modalAction = false;
  dateRange: Date[] = [];

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'live/sys/host/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD HH:mm:ss');
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD HH:mm:ss');
    }
  }

  onSubmitSuccess() {
    this.fetchList();
    this.message.success('操作成功');
  }

  updateItem(id: number) {
    this.http.post(`live/sys/host/change/${id}/0`, {}).subscribe(event => {
    });
  }
}
