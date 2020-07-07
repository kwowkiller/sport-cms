import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {User} from '../user.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-point-setting',
  template: `
    <nz-modal
      [nzVisible]="visiable"
      nzTitle="积分设置"
      [nzWidth]="600"
      (nzOnCancel)="form.reset({type:6});visiableChange.emit(false)"
      (nzOnOk)="submit()"
      [nzOkDisabled]="!form.valid"
      [nzOkLoading]="submiting"
    >
      <form nz-form [formGroup]="form">
        <nz-form-item>
          <nz-form-label [nzSm]="4" nzRequired>变动类型</nz-form-label>
          <nz-form-control [nzSm]="17">
            <nz-radio-group formControlName="type">
              <label nz-radio [nzValue]="6">充值</label>
              <label nz-radio [nzValue]="7">扣除</label>
            </nz-radio-group>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="4" nzRequired>{{form.value.type == 6 ? '充值' : '扣除'}}积分</nz-form-label>
          <nz-form-control [nzSm]="17">
            <input type="number" nz-input formControlName="point">
          </nz-form-control>
        </nz-form-item>
      </form>
      <div nz-col nzOffset="4" nzSpan="17">
        操作后用户积分为：{{afterPoint}}
      </div>
    </nz-modal>
  `,
  styles: []
})
export class PointSettingComponent extends ModalForm<User> implements OnInit, OnChanges {

  get afterPoint(): number {
    if (!this.detail) {
      return 0;
    }
    const n = Number(this.form.value.point);
    return this.form.value.type === 6 ? this.detail.points + n : this.detail.points - n;
  }

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.submitUrl = 'app/sys/app/user/point';
    this.method = 'PUT';
    this.form = this.fb.group({
      type: [6],
      point: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  beforeSubmit() {
    this.form.value.userId = this.detail.id;
  }
}
