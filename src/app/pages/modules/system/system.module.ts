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
  NzGridModule,
  NzInputModule,
  NzModalModule, NzPopconfirmModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalFormComponent} from './role/modal-form/modal-form.component';
import { ModelFormComponent } from './admin/model-form/model-form.component';

@NgModule({
  declarations: [
    MenuComponent,
    AdminComponent,
    RoleComponent,
    ModalFormComponent,
    ModelFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'menu', component: MenuComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'role', component: RoleComponent},
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
  ]
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
