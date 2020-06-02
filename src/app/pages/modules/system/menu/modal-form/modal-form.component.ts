import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {Menu} from '../../system.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService, NzTreeNodeOptions} from 'ng-zorro-antd';
import {Session} from '../../../../../common/session';
import {Menu as UIMenu} from '../../../../../common/common.model';

@Component({
  selector: 'app-menu-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Menu> implements OnInit, OnChanges {

  get title() {
    return this.detail ? '编辑菜单' : '新增菜单';
  }

  treeData: NzTreeNodeOptions[] = [];

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {
    super(http);
    this.form = this.fb.group({
      menuName: [null, [Validators.required]],
      icon: [null],
      orderNum: [0, [Validators.required]],
      path: [null],
      parentId: [null],
      type: [0],
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
    if (this.detail) {
      this.submitUrl = 'admin/system/menu/update';
      this.method = 'PUT';
      this.form.addControl('menuId', this.fb.control(null));
      this.form.setValue({
        menuId: this.detail.menuId,
        menuName: this.detail.menuName,
        icon: this.detail.icon,
        orderNum: this.detail.orderNum,
        path: this.detail.path,
        parentId: this.detail.parentId == null ? null : String(this.detail.parentId),
        type: this.detail.type,
      });
    } else {
      this.submitUrl = 'admin/system/menu/add';
      this.method = 'POST';
      this.form.removeControl('menuId');
      this.form.reset({
        type: 0,
      }, {onlySelf: true});
    }
  }

  beforeSubmit() {
  }

  onFail(error) {
    this.message.error(error);
  }
}
