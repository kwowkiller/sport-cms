import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {Menu} from '../../system.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import {Session} from '../../../../../common/session';
import {Menu as UIMenu} from '../../../../../common/common.model';

@Component({
  selector: 'app-menu-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Menu> implements OnInit, OnChanges {

  get title() {
    return '新增菜单';
  }

  treeData: NzTreeNodeOptions[] = [];

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      menuName: [null, [Validators.required]],
      icon: [null],
      orderNum: [0, [Validators.required]],
      path: [null],
      parentId: [null],
    });
    this.submitUrl = 'admin/system/menu/add';
  }

  ngOnInit(): void {
    const foo = (menus: UIMenu[]): NzTreeNodeOptions[] => {
      if (!menus || menus.length === 0) {
        return;
      }
      return menus.map(m => ({
        title: m.name,
        key: String(m.id),
        isLeaf: !m.children || m.children.length === 0,
        children: foo(m.children),
      }));
    };
    this.treeData = foo(Session.menus);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  beforeSubmit() {
  }
}
