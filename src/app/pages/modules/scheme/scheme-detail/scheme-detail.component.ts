import {Component, Input, OnInit} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {Scheme} from '../scheme.module';

@Component({
  selector: 'app-scheme-detail',
  templateUrl: './scheme-detail.component.html',
  styleUrls: ['./scheme-detail.component.less']
})
export class SchemeDetailComponent extends ModalForm<Scheme> implements OnInit {
  @Input()
  showAudit = false;

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({
      remark: [null],
      status: [0],
    });
    this.submitUrl = 'match/sys/match/programApply';
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
    if (this.showAudit) {
      this.form.value.programApplyId = this.queryId;
    }
  }
}
