import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {Menu, Role} from '../../system.module';
import {HttpClient} from '@angular/common/http';
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions} from 'ng-zorro-antd';
import {Pageable} from '../../../../../common/common.model';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styles: []
})
export class PermissionComponent extends ModalForm<Role> implements OnInit {
  treeData: NzTreeNodeOptions[] = [];
  @ViewChild('nzTreeComponent', {static: false})
  nzTreeComponent: NzTreeComponent;

  constructor(protected http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
    this.queryId = 5;
    this.http.get(`admin/system/role/role/menu/${this.queryId}`).subscribe(event => {
    });
    // 获取角色权限
    this.http.get<Pageable<Menu>>('admin/system/menu/page', {
      params: {pageSize: '10000'},
    }).subscribe(event => {
        const foo = (array: Menu[]): NzTreeNodeOptions[] => {
          return array.map((item) => {
            return {
              title: item.menuName,
              key: String(item.menuId),
              children: foo(event.data.records.filter(i => i.parentId === item.menuId)),
              isLeaf: !event.data.records.some(i => i.parentId === item.menuId),
            };
          });
        };
        this.treeData = foo(event.data.records.filter(i => i.parentId == null));
      }
    );
  }

  // 获取钩选中菜单的id
  private getSelectMenusId(): Array<any> {
    const arr = [];
    // 添加半选中菜单
    this.nzTreeComponent.getHalfCheckedNodeList().forEach(item => {
      arr.push(item.key);
    });
    this.nzTreeComponent.getCheckedNodeList().forEach(item => {
      arr.push(item.key);
    });
    return arr;
  }

  beforeSubmit() {
  }
}
