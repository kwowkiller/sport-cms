import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {SexType} from '../../../../common/enum';
import {Scheme} from '../scheme.module';

@Component({
  selector: 'app-purchase-record',
  templateUrl: './purchase-record.component.html',
  styles: []
})
export class PurchaseRecordComponent extends Table<Item> implements OnInit {
  @Input()
  detail: Scheme;
  sexType = SexType;

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
    this.search.programId = this.detail.id;
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
  sex: number;
  userId: number;
}
