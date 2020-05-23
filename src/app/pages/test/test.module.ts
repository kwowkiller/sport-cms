import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestComponent} from './test.component';
import {RouterModule} from '@angular/router';
import {NzSelectModule, NzSpinModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: TestComponent,
    }]),
    NzSelectModule,
    NzSpinModule,
    FormsModule,
  ]
})
export class TestModule {
}
