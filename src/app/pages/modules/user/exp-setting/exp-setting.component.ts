import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {User} from '../user.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-exp-setting',
  template: `
    <nz-modal
      [nzVisible]="visiable"
      nzTitle="经验设置"
      [nzWidth]="600"
      (nzOnCancel)="form.reset();visiableChange.emit(false)"
      (nzOnOk)="submit()"
      [nzOkDisabled]="!form.valid"
      [nzOkLoading]="submiting"
    >
      <nz-form-item>
        <nz-form-label [nzSm]="4" nzRequired>增加经验</nz-form-label>
        <nz-form-control [nzSm]="17">
          <input type="text" nz-input>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="4" nzRequired>减少经验</nz-form-label>
        <nz-form-control [nzSm]="17">
          <input type="text" nz-input>
        </nz-form-control>
      </nz-form-item>
      <div nz-col nzOffset="4" nzSpan="17">
        操作后用户等级为：Lv4（1600）
      </div>
    </nz-modal>
  `,
  styles: []
})
export class ExpSettingComponent extends ModalForm<User> implements OnInit, OnChanges {

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  beforeSubmit() {
  }
}
