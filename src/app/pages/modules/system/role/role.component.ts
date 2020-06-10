import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Role} from '../system.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {PermissionService} from '../../../../services/permission.service';

@Component({
  selector: 'app-system-role',
  templateUrl: './role.component.html',
  styles: []
})
export class RoleComponent extends Table<Role> implements OnInit {
  modalTreeShow = false;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private permissionService: PermissionService,
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
    this.message.success('操作成功');
    this.fetchList('none');
    // 刷新角色
    this.permissionService.fetchRoles().then();
  }

  remove(id: number) {
    this.deleteUrl = `admin/system/role/delete/${id}`;
    this.deleteItem();
  }
}
