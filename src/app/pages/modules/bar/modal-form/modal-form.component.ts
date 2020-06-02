import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Bar} from '../bar.module';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-bar-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<Bar> implements OnInit, OnChanges {
  placeholder = '';

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      barLogo: [null, [Validators.required]],
      barName: [null, [Validators.required]],
      barType: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });
    this.submitUrl = 'bar/sys/bar/add';
  }

  get title() {
    return this.detail ? '编辑球吧' : '创建球吧';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.method = 'PUT';
      this.submitUrl = 'bar/sys/bar/update';
      this.form.addControl('id', this.fb.control(null));
      this.form.setValue({
        id: this.detail.id,
        barLogo: this.detail.barLogo,
        barName: this.detail.barName,
        barType: this.detail.barType,
        userId: this.detail.userId,
      });
      this.placeholder = this.detail.username;
    } else {
      this.placeholder = '输入用户名搜索匹配的用户';
      this.method = 'POST';
      this.submitUrl = 'bar/sys/bar/add';
      this.form.removeControl('id');
      this.form.reset();
    }
  }


  beforeSubmit() {
  }
}
