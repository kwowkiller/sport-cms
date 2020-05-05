import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../common/table';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../user.module';
import * as moment from 'moment';

@Component({
  selector: 'app-user-auth-list',
  templateUrl: './auth-list.component.html',
  styles: []
})
export class AuthListComponent extends Table<Auth> implements OnInit {
  dateRange: Date[] = [];
  detail: Auth;
  modalDetailShow = false;
  modalActionShow = false;

  constructor(http: HttpClient) {
    super(http);
    this.url = 'app/sys/app/user/auth/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    if (this.dateRange.length !== 0) {
      this.search.authTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.authTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }
}
