import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
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
      <form nz-form [formGroup]="form">
        <nz-form-item>
          <nz-form-label [nzSm]="6" nzRequired>主播分成比例</nz-form-label>
          <nz-form-control [nzSm]="15">
            <input type="number" nz-input formControlName="rate">
          </nz-form-control>
        </nz-form-item>
        <div nz-col nzOffset="6" nzSpan="15">
          直播所得积分由系统抽50%，用户得50%
        </div>
      </form>
    </nz-modal>
  `,
  styles: []
})
export class ModalSetting2Component extends ModalForm<Anchor> implements OnInit, OnChanges {

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.submitUrl = 'live/sys/host/rate';
    this.method = 'PUT';
    this.form = this.fb.group({
      rate: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail && this.visiable && typeof this.detail.rate === 'number') {
      this.form.setValue({
        rate: this.detail.rate,
      });
    }
  }

  beforeSubmit() {
    this.form.value.id = this.detail.id;
  }

}
