import {Component, OnInit} from '@angular/core';
import {Match} from '../match.module';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-match-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {
  list: Match[] = [];
  loading = false;
  selected: Match = null;
  tabIndex = 0;
  search: {
    /**
     * 即时() 赛程(今天之后) 赛果(今天之前) 其他()
     */
    type?: number,
    date?: Date,
  } = {};

  constructor(private http: HttpClient) {
  }

  format(arr: any[]) {
    return arr as Match[];
  }

  ngOnInit(): void {
    this.fetchList();
  }

  formatDate() {
    if (this.search.date) {
      return moment(this.search.date).format('YYYYMMDD');
    }
    return '';
  }

  fetchList() {
    const params: any = {};
    if (this.search.type) {
      params.type = this.search.type;
    }
    if (this.search.date) {
      params.date = this.formatDate();
    }
    this.loading = true;
    this.http.get<{ code: number, data: Match[] }>('match/sys/football/event', {
      params,
    }).pipe(
      finalize(() => this.loading = false),
    ).subscribe(event => {
      if (event.code === 200) {
        this.list = event.data;
      }
    });
  }
}
