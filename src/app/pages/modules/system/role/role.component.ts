import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Role} from '../system.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-system-role',
  templateUrl: './role.component.html',
  styles: []
})
export class RoleComponent extends Table<Role> implements OnInit {
  modalTreeShow = true;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.idKey = 'roleId';
    this.listUrl = 'admin/system/role/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.fetchList('none');
  }

  remove(id: number) {
    this.deleteUrl = `admin/system/role/delete/${id}`;
    this.deleteItem();
  }
}
