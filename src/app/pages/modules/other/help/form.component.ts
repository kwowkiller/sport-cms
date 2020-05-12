import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Help} from '../other.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-help-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Help> implements OnInit, OnChanges {

  get title() {
    return this.detail ? '编辑常见问题' : '新增常见问题';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      answer: [null, [Validators.required]],
      orderNum: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
    });
    this.submitUrl = 'app/sys/feedback/add';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.form.addControl('id', this.fb.control(null));
      this.method = 'PUT';
      this.submitUrl = 'app/sys/feedback/update';
      this.form.setValue({
        id: this.detail.id,
        title: this.detail.title,
        answer: this.detail.answer,
        orderNum: this.detail.orderNum,
        imageUrl: this.detail.imageUrl,
      });
    } else {
      this.form.removeControl('id');
      this.form.reset();
      this.method = 'POST';
      this.submitUrl = 'app/sys/feedback/add';
    }
  }

  beforeSubmit() {
  }
}
