import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatchItem} from '../match.module';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-match-sub-list',
  templateUrl: './sub-list.component.html',
  styles: []
})
export class SubListComponent implements OnInit, OnChanges {
  @Input()
  matchId = 0;
  @Input()
  matchName = '';
  @Input()
  date: string;
  list: MatchItem[] = [];
  loading = false;
  search: {
    /**
     * 即时() 赛程(今天之后) 赛果(今天之前) 其他()
     */
    type?: number,
  } = {};

  selected: MatchItem;
  modal1Show = false;
  modal2Show = false;
  modal3Show = false;

  constructor(private http: HttpClient) {
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

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.search = {};
    this.fetchList();
  }

  fetchList() {
    this.loading = true;
    const params: any = {eventIds: `${this.matchId}`};
    if (this.date) {
      params.date = this.date;
    }
    if (this.search.type) {
      params.type = this.search.type;
    }
    this.http.get<{ code: number; data: MatchItem[] }>('match/sys/football/schedule', {
      params,
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      if (event.code === 200) {
        this.list = event.data;
      }
    });
  }
}
