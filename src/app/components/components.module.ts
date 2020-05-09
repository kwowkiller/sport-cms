import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './upload/upload.component';
import {NzIconModule, NzSelectModule, NzUploadModule} from 'ng-zorro-antd';
import {UserSelectComponent} from './user-select/user-select.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    UploadComponent,
    UserSelectComponent,
  ],
  exports: [
    UploadComponent,
    UserSelectComponent
  ],
  imports: [
    CommonModule,
    NzUploadModule,
    NzIconModule,
    NzSelectModule,
    FormsModule
  ]
})
export class ComponentsModule {
}
