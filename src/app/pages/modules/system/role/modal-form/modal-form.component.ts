import {Component, OnInit} from '@angular/core';
import {Role} from '../../system.module';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ModalForm} from '../../../../../frame/modal-form';

@Component({
  selector: 'app-role-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Role> implements OnInit {
  get title() {
    return this.detail ? '编辑角色' : '新建角色';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.submitUrl = 'admin/system/role/add';
    this.form = this.fb.group({
      roleName: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
