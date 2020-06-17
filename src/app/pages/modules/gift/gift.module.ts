import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzInputModule,
  NzModalModule,
  NzRadioModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SendGiftComponent} from './send-gift/send-gift.component';
import {GiftFormComponent} from './gift-form/gift-form.component';
import {GiftListComponent} from './gift-list/gift-list.component';
import {ComponentsModule} from '../../../components/components.module';
import {QuantitySettingComponent} from './quantity-setting/quantity-setting.component';
import {PointListComponent} from './point-list/point-list.component';
import { PointFormComponent } from './point-form/point-form.component';

@NgModule({
  declarations: [
    GiftListComponent,
    SendGiftComponent,
    GiftFormComponent,
    QuantitySettingComponent,
    PointListComponent,
    PointFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: GiftListComponent},
      {path: 'point', component: PointListComponent},
    ]),
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    NzDividerModule,
    NzModalModule,
    ReactiveFormsModule,
    NzInputModule,
    ComponentsModule,
    NzSelectModule,
    NzRadioModule
  ]
})
export class GiftModule {
}
