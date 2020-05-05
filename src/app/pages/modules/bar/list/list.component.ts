import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../../common/table';
import {Bar} from '../bar.module';

@Component({
  selector: 'app-bar-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Bar> implements OnInit {

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
