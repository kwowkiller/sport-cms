import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Table} from '../../../../frame/table';
import {Scheme} from '../scheme.module';
import {Result} from '../../../../common/common.model';
import {finalize} from 'rxjs/operators';
import {BasketballMatchStatus, FootballMatchStatus, MatchTypes} from '../../../../common/enum';

@Component({
  selector: 'app-scheme-list',
  templateUrl: './scheme-list.component.html',
  styles: []
})
export class SchemeListComponent extends Table<Scheme> implements OnInit {
  tabIndex = 0;
  footballMatchStatus = FootballMatchStatus;
  basketballMatchStatus = BasketballMatchStatus;
  matchTypes = MatchTypes;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private modal: NzModalService,
  ) {
    super(http, message);
    this.listUrl = 'match/sys/match/program/list';
  }

  statusStr(item: Scheme): string {
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
    this.fetchList('all');
  }

  updateItem(item: Scheme) {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: '设为精选方案方案设为精选方案后该方案在前端显示在 ‘球吧-方案精选’ 列表，用户可查看该方案信息！',
      nzOnOk: () => {
        return this.http.post<Result>('match/sys/match/program/good', {
          programId: item.id,
        }).toPromise().then(result => {
          if (result.code === 200) {
            this.onSubmitSuccess();
          } else {
            this.message.error(result.message);
          }
        });
      },
      nzOkLoading: this.updating,
    });
  }
}

