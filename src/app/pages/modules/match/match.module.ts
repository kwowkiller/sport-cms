import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {NzButtonModule, NzDividerModule, NzGridModule, NzInputModule, NzSelectModule, NzTableModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: ListComponent}
    ]),
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
  ]
})
export class MatchModule {
}

export interface Match {
  id: number;
}
