import {Injectable} from '@angular/core';
import {Menu, Role} from '../pages/modules/system/system.module';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../common/common.model';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import {Session} from '../common/session';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private menuData: Menu[] = [];
  menus: NzTreeNodeOptions[] = [];
  buttons: Menu[] = [];
  roles: Role[] = [];

  constructor(private http: HttpClient) {
  }

  fetchMenus(expanded = true) {
    return new Promise<void>(resolve => {
      this.http.get<Pageable<Menu>>('admin/system/menu/page', {
        params: {pageSize: '10000'},
      }).subscribe(event => {
        const menus = event.data.records;
        this.menuData = event.data.records;
        const foo = (array: Menu[]): NzTreeNodeOptions[] => {
          return array.map((item) => {
            return {
              title: item.menuName,
              key: String(item.menuId),
              children: foo(menus.filter(i => i.parentId === item.menuId)),
              isLeaf: !menus.some(i => i.parentId === item.menuId),
              expanded,
            };
          });
        };
        this.menus = foo(menus.filter(i => i.parentId == null));
        resolve();
      });
    });
  }

  async fetchButtons() {
    const roles = (await this.http.get<{
      code, data: Menu[],
    }>(`admin/system/role/role/menu/${Session.user.roleId}`).toPromise()).data;
    this.buttons = roles.filter(i => i.type === '1');
  }

  // 获取当前菜单下的按钮
  getCurrentMenuButtons(): Menu[] {
    const find = this.menuData.find(i => i.path && location.pathname.endsWith(i.path));
    if (!find) {
      return [];
    }
    return this.buttons.filter(i => i.parentId === find.menuId);
  }

  fetchRoles() {
    return new Promise<void>(resolve => {
      this.http.get<Pageable<Role>>('admin/system/role/page', {
        params: {pageNumber: '1000'}
      }).subscribe(event => {
        this.roles = event.data.records;
      });
    });
  }
}
