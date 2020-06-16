import {Component, OnInit} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Anchor} from '../anchor.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-modal-setting1',
  template: `
    <nz-modal
      [nzVisible]="visiable"
      nzTitle="设置主播标签"
      [nzWidth]="600"
      (nzOnCancel)="form.reset();visiableChange.emit(false)"
      (nzOnOk)="submit()"
      [nzOkDisabled]="!form.valid"
      [nzOkLoading]="submiting"
    >
      <nz-form-item>
        <nz-form-label [nzSm]="4" nzRequired>主播标签</nz-form-label>
        <nz-form-control [nzSm]="17">
          <input type="text" nz-input>
        </nz-form-control>
      </nz-form-item>
    </nz-modal>
  `,
  styles: []
})
export class ModalSetting1Component extends ModalForm<Anchor> implements OnInit {

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
