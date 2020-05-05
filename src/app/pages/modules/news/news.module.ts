import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {FormsModule} from '@angular/forms';
import {NzButtonModule, NzDividerModule, NzGridModule, NzInputModule, NzSelectModule, NzTableModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzDividerModule,
    NzTableModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
  ]
})
export class NewsModule {
}

export interface News {
  id: number;
}
