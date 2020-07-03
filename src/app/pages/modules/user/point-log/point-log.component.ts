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

  fetchList(reset: 'all' | 'page' | 'none' = 'none') {
    if (reset === 'all') {
      this.search = {
        pageNum: 1,
        pageSize: 10,
      };
    }
    this.loading = true;
    this.beforeSearch();
    this.http.get<PointLog[]>(this.listUrl, {
      params: this.search,
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.list = event;
    });
  }
}

interface PointLog {
  // 总价(总金币数)
  amount: number;
  // 批次ID
  batchNo: number;
  createTime: string;
  // 结束积分
  endPoints: number;
  // 用户头像
  headerImg: string;
  id: number;
  // 礼物ID
  itemId: number;
  // 用户昵称
  nickname: string;
  // 用户手机
  phone: string;
  // 价格(金币数)
  price: number;
  // 礼物金币数
  quantity: number;
  // 开始积分
  startPoints: number;
  // 任务标识
  taskIcon: string;
  // 任务名称
  taskName: string;
  //   类型(0:.赠送礼物1:收到礼物2:购买方案3:出售方案4:积分充值5:任务赠送6:后台充值7:后台扣减)
  type: number;
  userId: number;
  username: string;
}
