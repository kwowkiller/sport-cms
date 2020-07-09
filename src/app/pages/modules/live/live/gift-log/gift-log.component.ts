import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Live2} from '../../live.module';

@Component({
  selector: 'app-gift-log',
  templateUrl: './gift-log.component.html',
  styles: []
})
export class GiftLogComponent extends Table<GiftLog> implements OnInit {
  @Input()
  query: Live2;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'live/sys/host/log/transactionLog';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    this.search.type = 1;
    this.search.userId = this.query.hostId;
    this.search.createTimeTo = this.query.toTime;
    this.search.createTimeForm = this.query.fromTime;
  }

  onSubmitSuccess() {
  }
}

interface GiftLog {
  amount: number;
  batchNo: number;
  createTime: string;
  id: number;
  itemId: number;
  price: number;
  quantity: number;
  userId: number;
}
