import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {User} from '../user.module';
import {NzMessageService} from 'ng-zorro-antd';
import {SexType} from '../../../../common/enum';

@Component({
  selector: 'app-user-sub-list',
  templateUrl: './sub-list.component.html',
  styles: []
})
export class SubListComponent extends Table<User> implements OnInit, OnChanges {
  @Input()
  userId: number;
  // 粉丝列表 关注用户列表
  @Input()
  type: 'fans' | 'follow';
  sexType = SexType;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      this.listUrl = this.type === 'fans' ?
        `app/sys/app/user/fans/${this.userId}`
        : `app/sys/app/user/focus/${this.userId}`;
    }
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
