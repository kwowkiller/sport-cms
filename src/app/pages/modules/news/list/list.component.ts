import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../common/table';
import {News} from '../news.module';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-news-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<News> implements OnInit {

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
