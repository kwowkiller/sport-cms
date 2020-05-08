import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../../common/table';
import {User} from '../user.module';
import * as moment from 'moment';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<User> implements OnInit {
  dateRange: Date[] = [];

  constructor(http: HttpClient) {
    super(http);
    this.url = 'app/sys/app/user/page';
  }

  beforeSearch() {
    if (this.dateRange.length !== 0) {
      this.search.startDate = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.endDate = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  onSubmitSuccess() {
  }
}
