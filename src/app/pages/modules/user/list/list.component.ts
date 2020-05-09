import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../../frame/table';
import {User} from '../user.module';
import * as moment from 'moment';
import {NzMessageService} from 'ng-zorro-antd';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<User> implements OnInit {
  tabIndex = 0;
  subTableType: 'fans' | 'bar' | 'follow';
  dateRange: Date[] = [];
  // 设置禁言
  modalStatusShow = false;

  get subTableTitle() {
    let str = '';
    switch (this.subTableType) {
      case 'bar':
        str = '关注的吧';
        break;
      case 'fans':
        str = '粉丝';
        break;
      case 'follow':
        str = '关注的人';
        break;
    }
    return `${this.selected.username}的${str}`;
  }

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'app/sys/app/user/page';
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
    this.message.success('禁言成功');
    this.fetchList('none');
  }

  // 解除禁言
  unbannedUser(id: number) {
    this.http.delete<Result>(`app/sys/app/user/banned/${id}`).subscribe(event => {
      if (event.code === 200) {
        this.message.success('解除禁言成功');
        this.fetchList('none');
      }
    });
  }
}
