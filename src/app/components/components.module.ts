import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './upload/upload.component';
import {NzIconModule, NzUploadModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [
    UploadComponent,
  ],
  exports: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    NzUploadModule,
    NzIconModule
  ]
})
export class ComponentsModule {
}
