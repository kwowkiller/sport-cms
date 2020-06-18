import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Bar} from '../bar.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styles: []
})
export class AuditListComponent extends Table<Bar> implements OnInit {
  dateRange: Date[] = [];
  // 吧主信息
  modalUserShow = false;
  // 审核弹框
  modalApproveShow = false;
  // 审核备注
  modalRemark = false;

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
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }

  onSubmitSuccess() {
  }
}
