import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Anchor} from '../anchor.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

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
      <form nz-form [formGroup]="form">
        <nz-form-item>
          <nz-form-label [nzSm]="4" nzRequired>主播标签</nz-form-label>
          <nz-form-control [nzSm]="17">
            <input type="text" nz-input formControlName="officialIcon">
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-modal>
  `,
  styles: []
})
export class ModalSetting1Component extends ModalForm<Anchor> implements OnInit, OnChanges {

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.method = 'PUT';
    this.submitUrl = 'live/sys/host/officialicon';
    this.form = this.fb.group({
      officialIcon: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail && this.visiable) {
      this.form.setValue({
        officialIcon: this.detail.officialIcon,
      });
    }
  }

  beforeSubmit() {
    this.form.value.id = this.detail.id;
  }
}
