import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // 菜单管理
      {path: 'menu', component: MenuComponent}
    ]),
  ]
})
export class SystemModule {
}
