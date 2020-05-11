import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NzButtonModule, NzFormModule, NzGridModule, NzInputModule, NzModalModule, NzSelectModule, NzTableModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListComponent} from './list/list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzTableModule,
    NzGridModule,
    NzInputModule,
    FormsModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
  ]
})
export class MessageModule {
}

export interface Message {
  id: number;
}
