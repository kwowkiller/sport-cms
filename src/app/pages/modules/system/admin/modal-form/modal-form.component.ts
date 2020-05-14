import {Component, OnInit} from '@angular/core';
import {Admin} from '../../system.module';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ModalForm} from '../../../../../frame/modal-form';

@Component({
  selector: 'app-admin-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Admin> implements OnInit {

  get title() {
    return this.detail ? '编辑账户' : '新增账户';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      roleId: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
