import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ModalForm} from '../../../../frame/modal-form';
import {Anchor} from '../anchor.module';

@Component({
  selector: 'app-modal-setting2',
  template: `
    <nz-modal
      [nzVisible]="visiable"
      nzTitle="设置直播分成"
      [nzWidth]="600"
      (nzOnCancel)="form.reset();visiableChange.emit(false)"
      (nzOnOk)="submit()"
      [nzOkDisabled]="!form.valid"
      [nzOkLoading]="submiting"
    >
      <nz-form-item>
        <nz-form-label [nzSm]="6" nzRequired>主播分成比例</nz-form-label>
        <nz-form-control [nzSm]="15">
          <input type="text" nz-input>
        </nz-form-control>
      </nz-form-item>
      <div nz-col nzOffset="6" nzSpan="15">
        直播所得积分由系统抽50%，用户得50%
      </div>
    </nz-modal>
  `,
  styles: []
})
export class ModalSetting2Component extends ModalForm<Anchor> implements OnInit {

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }

}
