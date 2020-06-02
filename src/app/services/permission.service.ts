import {Injectable} from '@angular/core';
import {Menu} from '../pages/modules/system/system.module';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../common/common.model';
import {NzTreeNodeOptions} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  menus: NzTreeNodeOptions[] = [];

  constructor(private http: HttpClient) {
  }

  fetchMenus() {
    this.http.get<Pageable<Menu>>('admin/system/menu/page', {
      params: {pageSize: '10000'},
    }).subscribe(event => {
      const menus = event.data.records;
      const foo = (array: Menu[]): NzTreeNodeOptions[] => {
        return array.map((item) => {
          return {
            title: item.menuName,
            key: String(item.menuId),
            children: foo(menus.filter(i => i.parentId === item.menuId)),
            isLeaf: !menus.some(i => i.parentId === item.menuId),
            expanded: true,
          };
        });
      };
      this.menus = foo(menus.filter(i => i.parentId == null));
    });
  }
}
