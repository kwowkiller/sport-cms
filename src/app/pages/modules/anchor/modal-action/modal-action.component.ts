import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Anchor} from '../anchor.module';

@Component({
  selector: 'app-anchor-action',
  templateUrl: './modal-action.component.html',
})
export class ModalActionComponent extends ModalForm<Anchor> implements OnInit, OnChanges {
  dateRange: Date[] = [];

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.submitUrl = 'live/sys/host/change/{id}/1';
    this.form = this.fb.group({
      forbiddenFrom: [null, [Validators.required]],
      forbiddenTo: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.submitUrl = `live/sys/host/change/${this.detail.id}/1`;
    }
  }

  beforeSubmit() {
  }

  setDateRange() {
    this.form.controls.forbiddenFrom.setValue(moment(this.dateRange[0]).format('YYYY-MM-DD HH:mm:ss'));
    this.form.controls.forbiddenTo.setValue(moment(this.dateRange[1]).format('YYYY-MM-DD HH:mm:ss'));
  }
}
