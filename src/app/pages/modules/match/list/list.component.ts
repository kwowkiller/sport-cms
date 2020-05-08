import {Component, OnInit} from '@angular/core';
import {Match} from '../match.module';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
  }

  format(arr: any[]) {
    return arr as Match[];
  }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.loading = true;
    this.http.get<{ code: number, data: Match[] }>('match/sys/football/event', {
      params: {type: '1'}
    }).pipe(
      finalize(() => this.loading = false),
    ).subscribe(event => {
      if (event.code === 200) {
        this.list = event.data;
      }
    });
  }
}
