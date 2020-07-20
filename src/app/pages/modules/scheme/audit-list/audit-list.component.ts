import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BasketballMatchStatus, FootballMatchStatus, MatchTypes} from '../../../../common/enum';
import {AuditItem} from '../scheme.module';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styles: []
})
export class AuditListComponent extends Table<AuditItem> implements OnInit {
  footballMatchStatus = FootballMatchStatus;
  basketballMatchStatus = BasketballMatchStatus;
  matchTypes = MatchTypes;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private modal: NzModalService,
  ) {
    super(http, message);
    this.listUrl = 'match/sys/match/programApply/list';
  }

  statusStr(item: AuditItem): string {
    switch (item.matchType) {
      case 1:
        return this.footballMatchStatus.getLabel(item.matchStatus);
      case 2:
        return this.basketballMatchStatus.getLabel(item.matchStatus);
      default:
        return '未知';
    }
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

  showAuditDetail(item: AuditItem) {
    this.modal.info({
      nzTitle: '不通过原因',
      nzContent: item.remark,
    });
  }
}

