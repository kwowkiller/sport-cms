import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './upload/upload.component';
import {NzIconModule, NzSelectModule, NzSpinModule, NzUploadModule} from 'ng-zorro-antd';
import {UserSelectComponent} from './user-select/user-select.component';
import {FormsModule} from '@angular/forms';
import { BarSelectComponent } from './bar-select/bar-select.component';


@NgModule({
  declarations: [
    UploadComponent,
    UserSelectComponent,
    BarSelectComponent,
  ],
  exports: [
    UploadComponent,
    UserSelectComponent,
    BarSelectComponent
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
