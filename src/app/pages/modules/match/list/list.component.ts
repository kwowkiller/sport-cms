import {Component, OnInit} from '@angular/core';
import {MatchItem, MatchType} from '../match.module';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import * as moment from 'moment';
import {Table} from '../../../../frame/table';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {FootballMatchStatus, BasketballMatchStatus} from '../../../../common/enum';

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
  footballMatchStatus = FootballMatchStatus;
  basketballMatchStatus = BasketballMatchStatus;

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

  statusStr(status: number): string {
    switch (this.type) {
      case 'football':
        return this.footballMatchStatus.getLabel(status);
      case 'basketball':
        return this.basketballMatchStatus.getLabel(status);
      default:
        return '未知';
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
        if (this.search.awayTeamName) {
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
