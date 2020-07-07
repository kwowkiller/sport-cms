import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {User} from '../user.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

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
      <form nz-form [formGroup]="form">
        <nz-form-item>
          <nz-form-label [nzSm]="4" nzRequired>选择等级</nz-form-label>
          <nz-form-control [nzSm]="17">
            <app-level-select
              formControlName="levelId"
            ></app-level-select>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-modal>
  `,
  styles: []
})
export class ExpSettingComponent extends ModalForm<User> implements OnInit, OnChanges {

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.method = 'PUT';
    this.submitUrl = 'app/sys/app/user/level';
    this.form = this.fb.group({
      levelId: [null, [Validators.required]]
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
