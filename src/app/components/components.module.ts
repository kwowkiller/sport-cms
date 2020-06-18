import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './upload/upload.component';
import {NzIconModule, NzSelectModule, NzSpinModule, NzUploadModule} from 'ng-zorro-antd';
import {UserSelectComponent} from './user-select/user-select.component';
import {FormsModule} from '@angular/forms';
import { BarSelectComponent } from './bar-select/bar-select.component';
import { CategorySelectComponent } from './category-select/category-select.component';
import { LevelSelectComponent } from './level-select/level-select.component';


@NgModule({
  declarations: [
    UploadComponent,
    UserSelectComponent,
    BarSelectComponent,
    CategorySelectComponent,
    LevelSelectComponent,
  ],
  exports: [
    UploadComponent,
    UserSelectComponent,
    BarSelectComponent,
    CategorySelectComponent,
    LevelSelectComponent
  ],
  imports: [
    CommonModule,
    NzUploadModule,
    NzIconModule,
    NzSelectModule,
    FormsModule,
    NzSpinModule
  ]
})
export class ComponentsModule {
}
