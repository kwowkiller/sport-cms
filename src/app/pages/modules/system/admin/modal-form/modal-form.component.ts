import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Admin} from '../../system.module';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ModalForm} from '../../../../../frame/modal-form';

@Component({
  selector: 'app-admin-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Admin> implements OnInit, OnChanges {

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

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.submitUrl = 'admin/system/user/update';
      this.method = 'PUT';
      this.form.addControl('userId', this.fb.control(null));
      this.form.removeControl('password');
      this.form.setValue({
        userId: this.detail.userId,
        username: this.detail.username,
        mobile: this.detail.mobile,
        roleId: Number(this.detail.roleId),
      });
    } else {
      this.submitUrl = 'admin/system/user/add';
      this.method = 'POST';
      this.form.removeControl('userId');
      this.form.addControl('password', this.fb.control(null, [Validators.required]));
      this.form.reset();
    }
  }

  beforeSubmit() {
  }
}
