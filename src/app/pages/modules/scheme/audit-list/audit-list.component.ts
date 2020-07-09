import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styles: []
})
export class AuditListComponent extends Table<Item> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private modal: NzModalService,
  ) {
    super(http, message);
    this.listUrl = 'match/sys/match/programApply/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.message.success('操作成功');
    this.fetchList('none');
  }

  showAuditDetail(item: Item) {
    this.modal.info({
      nzTitle: '不通过原因',
      nzContent: item.remark,
    });
  }
}

interface Item {
  id: number;
  anAlyze: string;
  createTime: string;
  dateTime: string;
  endTime: string;
  gameType: number;
  isCharge: number;
  matchId: number;
  matchName: string;
  matchStatus: number;
  matchType: number;
  money: number;
  nickname: string;
  // 选中胜负过关主1,客2胜平负位置6个
  position: number;
  remark: string;
  startTime: string;
  // 3待审核4审核不通过
  status: number;
  title: string;
  userId: number;
  userName: string;
  headerImg: string;
  history: string;
  hitTag: string;
  returnRate: number;
  winRate: number;
  winTag: string;
}
