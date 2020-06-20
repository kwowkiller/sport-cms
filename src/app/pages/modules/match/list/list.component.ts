import {Component, OnInit} from '@angular/core';
import {MatchItem, MatchType} from '../match.module';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import * as moment from 'moment';
import {Table} from '../../../../frame/table';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-match-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<MatchItem> implements OnInit {
  modal1Show = false;
  modal2Show = false;
  modal3Show = false;
  type: MatchType;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private route: ActivatedRoute,
  ) {
    super(http, message);
    this.search = {};
    this.type = this.route.snapshot.data.type;
    switch (this.type) {
      case 'basketball':
        this.listUrl = 'match/sys/basketball/schedule';
        break;
      case 'football':
        this.listUrl = 'match/sys/football/schedule';
        break;
    }
  }

  statusStr(status: number) {
    switch (status) {
      case 0:
        return '比赛异常';
      case 1:
        return '未开赛';
      case 2:
        return '上半场';
      case 3:
        return '中场';
      case 4:
        return '下半场';
      case 5:
        return '加时赛';
      case 6:
        return '加时赛(弃用)';
      case 7:
        return '点球决战';
      case 8:
        return '完场';
      case 9:
        return '推迟';
      case 10:
        return '中断';
      case 11:
        return '腰斩';
      case 12:
        return '取消';
      case 13:
        return '待定';
    }
  }

  format(item: any[]) {
    return item as MatchItem[];
  }

  getLiveUrls(item: MatchItem): string[] {
    if (item.liveUrl && item.liveUrl.length > 0) {
      return item.liveUrl.split(',').filter(url => url.length > 0);
    }
    return [];
  }

  fetchList(reset: 'all' | 'page' | 'none' = 'none') {
    this.loading = true;
    this.http.get<{ code: number; data: MatchItem[] }>(this.listUrl, {
      params: this.search,
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      if (event.code === 200) {
        this.list = event.data;
        if (this.search.matchName) {
          this.list = this.list.filter(i => i.eventName.includes(this.search.matchName));
        }
        if (this.search.homeTeamName) {
          this.list = this.list.filter(i => i.homeTeamName.includes(this.search.homeTeamName));
        }
        if(this.search.awayTeamName){
          this.list = this.list.filter(i => i.awayTeamName.includes(this.search.awayTeamName));
        }
        if (this.type === 'basketball') {
          this.list.forEach(item => {
            // @ts-ignore
            const arr1 = item.homeTeamScore as number[];
            arr1[arr1.length - 1] = arr1.reduce((p, c) => p + c);
            // @ts-ignore
            const arr2 = item.awayTeamScore as number[];
            arr2[arr2.length - 1] = arr2.reduce((p, c) => p + c);
          });
        }
      }
    });
  }

  getBasketballTotalScore(item: any) {
    return item[item.length - 1];
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
