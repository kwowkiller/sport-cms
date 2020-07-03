import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-gift-log',
  templateUrl: './gift-log.component.html',
  styles: []
})
export class GiftLogComponent extends Table<GiftLog> implements OnInit {
  @Input()
  queryId: number;

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
  }

  onSubmitSuccess() {
  }
}

interface GiftLog {
  id: number;
}
