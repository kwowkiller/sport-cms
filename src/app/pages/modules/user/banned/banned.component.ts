import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../user.module';
import * as moment from 'moment';

@Component({
  selector: 'app-banned',
  template: `
    <nz-modal
      [nzVisible]="visiable"
      nzTitle="禁言用户"
      [nzWidth]="600"
      (nzOnCancel)="form.reset({bannedStatus:0});visiableChange.emit(false)"
      (nzOnOk)="submit()"
      [nzOkDisabled]="!form.valid"
      [nzOkLoading]="submiting"
    >
      <nz-form-item>
        <nz-form-label [nzSm]="4" nzRequired>禁言时间</nz-form-label>
        <nz-form-control [nzSm]="17">
          <nz-range-picker
            style="width:100%"
            nzShowTime
            [(ngModel)]="dateRange"
            (ngModelChange)="setDateRange()"
          ></nz-range-picker>
        </nz-form-control>
      </nz-form-item>
      <div nz-col nzOffset="4" nzSpan="17">
        请确定是否对用户({{detail?.username}})进行禁言操作，禁言后用户在移动端无法进行直播 室发言操作和发布帖子回复帖子操作！
      </div>
    </nz-modal>
  `,
  styles: []
})
export class BannedComponent extends ModalForm<User> implements OnInit, OnChanges {
  dateRange: Date[] = [];

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.submitUrl = 'app/sys/app/user/banned';
    this.form = this.fb.group({
      userid: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      bannedStatus: [0]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.form.controls.userid.setValue(this.detail.id);
    }
  }

  beforeSubmit() {
  }

  setDateRange() {
    this.form.controls.startTime.setValue(moment(this.dateRange[0]).format('YYYY-MM-DD HH:mm:ss'));
    this.form.controls.endTime.setValue(moment(this.dateRange[1]).format('YYYY-MM-DD HH:mm:ss'));
  }
}
