import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {Menu, Role} from '../../system.module';
import {HttpClient} from '@angular/common/http';
import {NzTreeComponent, NzTreeNodeOptions} from 'ng-zorro-antd';
import {FormBuilder} from '@angular/forms';
import {PermissionService} from '../../../../../services/permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styles: []
})
export class PermissionComponent extends ModalForm<Role> implements OnInit, OnChanges {
  @ViewChild('nzTreeComponent', {static: false})
  nzTreeComponent: NzTreeComponent;
  checkedKeys = [];

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
    public permissionService: PermissionService,
  ) {
    super(http);
    this.submitUrl = 'admin/system/role/menu';
    this.permissionService.fetchMenus();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visiable) {
      this.checkedKeys = [];
      this.http.get<{ code, data: Menu[] }>(`admin/system/role/role/menu/${this.queryId}`).subscribe(event => {
        this.checkedKeys = event.data.map(item => String(item.menuId));
      });
    }
  }

  // 获取钩选中菜单的id
  private getSelectMenusId(): Array<any> {
    const arr = [];
    const foo = (array: NzTreeNodeOptions[]) => {
      array.forEach((item) => {
        if (item.checked) {
          arr.push(item.key);
        }
        if (item.children) {
          foo(item.children);
        }
      });
    };
    // 添加半选中菜单
    this.nzTreeComponent.getHalfCheckedNodeList().forEach(item => {
      arr.push(item.key);
    });
    foo(this.permissionService.menus);
    return arr;
  }

  beforeSubmit() {
    this.form = this.fb.group({
      roleId: this.queryId,
      menuIds: this.getSelectMenusId().join(','),
    });
  }
}
