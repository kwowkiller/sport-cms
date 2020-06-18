import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {AdminComponent} from './admin/admin.component';
import {RoleComponent} from './role/role.component';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule, NzIconModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule, NzRadioModule,
  NzSelectModule,
  NzTableModule, NzTreeModule, NzTreeSelectModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalFormComponent as RoleForm} from './role/modal-form/modal-form.component';
import {ModalFormComponent as AdminForm} from './admin/modal-form/modal-form.component';
import {ModalFormComponent as MenuForm} from './menu/modal-form/modal-form.component';
import {RoleSelectComponent} from './role-select/role-select.component';
import {PermissionComponent} from './role/permission/permission.component';
import {DirectiveModule} from '../../../directives/directive.module';
import {LiveEnvComponent} from './live-env/live-env.component';
import { LiveEnvFormComponent } from './live-env/live-env-form/live-env-form.component';

@NgModule({
  declarations: [
    MenuComponent,
    AdminComponent,
    RoleComponent,
    RoleForm,
    AdminForm,
    MenuForm,
    RoleSelectComponent,
    PermissionComponent,
    LiveEnvComponent,
    LiveEnvFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'menu', component: MenuComponent},
      {
        path: 'admin',
        component: AdminComponent,
      },
      {path: 'role', component: RoleComponent},
      {path: 'live-env', component: LiveEnvComponent},
    ]),
    NzTableModule,
    NzGridModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzSelectModule,
    NzDividerModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzPopconfirmModule,
    NzIconModule,
    NzTreeSelectModule,
    NzTreeModule,
    NzRadioModule,
    DirectiveModule,
  ],
  providers: []
})
export class SystemModule {
}

export interface Admin {
  avatar: string;
  createTime: string;
  description: string;
  email: string;
  lastLoginTime: string;
  mobile: string;
  password: string;
  roleId: number;
  roleName: string;
  ssex: number;
  status: number;
  updateTime: string;
  userId: number;
  username: string;
}

export interface Role {
  createTime: string;
  remark: string;
  roleId: number;
  roleName: string;
  updateTime: string;
}

export interface Menu {
  component: string;
  createTime: string;
  createTimeFrom: string;
  icon: string;
  menuId: number;
  menuName: string;
  orderNum: number;
  parentId: number;
  path: string;
  perms: any;
  type: string;
  updateTime: string;
  updateTimeTo: string;
}
