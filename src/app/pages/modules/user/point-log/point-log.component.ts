import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService, NzTableData} from 'ng-zorro-antd';
import * as moment from 'moment';
import {PointType} from '../../../../common/enum';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-point-log',
  templateUrl: './point-log.component.html',
  styles: []
})
export class PointLogComponent extends Table<PointLog> implements OnInit {
  @Input()
  userId: number;
  dateRange: Date[] = [];
  pointType = PointType;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'app/sys/app/user/point';
  }

  formatList(data: any[]) {
    return data as PointLog[];
  }


  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
    this.search.userId = this.userId;
  }

  onSubmitSuccess() {
  }
}

interface PointLog {
  beforePoints?: number;
  balancePoints: number;
  batchNo: number;
  createTime: string;
  id: number;
  points: number;
  type: number;
  userId: number;
}
