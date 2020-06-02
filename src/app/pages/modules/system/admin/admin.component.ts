import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Admin} from '../system.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-system-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent extends Table<Admin> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'admin/system/user';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.message.success('操作成功');
    this.fetchList();
  }

  onDeleteSingle(userId: number) {
    this.deleteUrl = `admin/system/user/delete/${userId}`;
    this.deleteItem();
  }

  updatePassword(userId: number) {
    this.http.put<Result>('admin/system/user/update', {
      userId, password: '123456'
    }).subscribe(event => {
      if (event.code === 200) {
        this.message.success('重置密码成功');
      } else {
        this.message.error('重置密码失败');
      }
    });
  }
}
