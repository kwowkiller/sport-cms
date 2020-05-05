import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../common/table';
import {Match} from '../match.module';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-match-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Match> implements OnInit {

  constructor(http: HttpClient) {
    super(http);
    this.url = '';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }
}
