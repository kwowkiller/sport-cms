import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Table} from '../../../../frame/table';
import {SchemeUser} from '../scheme.module';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-scheme-user',
  templateUrl: './scheme-user.component.html',
  styles: []
})
export class SchemeUserComponent extends Table<SchemeUser> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'match/sys/match/program/user';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }

  updateItem(item: SchemeUser) {
    this.http.post<Result>('match/sys/match/program/user', {
      userId: item.userId,
      pushStatus: item.pushStatus === 0 ? 1 : 0,
    }).subscribe(event => {
      if (event.code === 200) {
        this.fetchList('none');
        this.message.success('操作成功');
      } else {
        this.message.error(event.message);
      }
    });
  }
}
