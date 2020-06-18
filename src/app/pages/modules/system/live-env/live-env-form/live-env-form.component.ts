import {Component, OnInit} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-live-env-form',
  templateUrl: './live-env-form.component.html',
  styles: []
})
export class LiveEnvFormComponent extends ModalForm<any> implements OnInit {
  get title() {
    return this.detail ? '编辑环境' : '新增环境';
  }

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
