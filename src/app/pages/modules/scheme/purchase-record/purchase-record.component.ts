import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-purchase-record',
  templateUrl: './purchase-record.component.html',
  styles: []
})
export class PurchaseRecordComponent extends Table<Item> implements OnInit {
  @Input()
  queryId: number;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'match/sys/match/program/buy';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    this.search.programId = this.queryId;
  }

  onSubmitSuccess() {
  }

}

interface Item {
  createTime: string;
  headerImg: string;
  id: number;
  levelId: number;
  nickname: string;
  phone: string;
  programId: number;
  // 性别0:男1:女2:未知
  sex: number;
  userId: number;
}
