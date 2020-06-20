import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TaskListComponent} from './task-list/task-list.component';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzInputModule, NzModalModule,
  NzPopconfirmModule, NzRadioModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaskFormComponent} from './task-form/task-form.component';
import {ComponentsModule} from '../../../components/components.module';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: TaskListComponent},
    ]),
    NzTableModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    FormsModule,
    NzButtonModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzModalModule,
    ReactiveFormsModule,
    ComponentsModule,
    NzRadioModule,
  ]
})
export class TaskModule {
}

export interface Task {
  id: number;
}
