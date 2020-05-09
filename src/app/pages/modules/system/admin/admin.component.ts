import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Admin} from '../system.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

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
  }
}
