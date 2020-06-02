import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Menu} from '../system.module';
import {PermissionService} from '../../../../services/permission.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent extends Table<Menu> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private permissionService: PermissionService,
  ) {
    super(http, message);
    this.idKey = 'menuId';
    this.listUrl = 'admin/system/menu/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.message.success('保存成功');
    this.fetchList();
    // 重新加载菜单
    this.permissionService.fetchMenus();
  }

  onDeleteSingle(menuId: number) {
    this.deleteUrl = `admin/system/menu/delete/${menuId}`;
    this.deleteItem();
  }

  onDelete() {
    this.deleteUrl = `admin/system/menu/delete/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }
}
