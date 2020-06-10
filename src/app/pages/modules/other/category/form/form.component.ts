import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {Category} from '../../other.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Category> implements OnInit, OnChanges {
  form: FormGroup;

  get title() {
    return this.detail ? '编辑分类' : '新增分类';
  }

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({
      SStatus: [0, [Validators.required]],
      typeName: [null, [Validators.required]],
      orderNum: [null, [Validators.required]],
      moduleType: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.method = 'PUT';
      this.submitUrl = 'live/sys/liveType/update';
      this.form.addControl('id', this.fb.control(null));
      this.form.setValue({
        id: this.detail.id,
        SStatus: this.detail.sstatus,
        typeName: this.detail.typeName,
        orderNum: this.detail.orderNum,
        moduleType: this.detail.moduleType,
      });
    } else {
      this.method = 'POST';
      this.submitUrl = 'live/sys/liveType/add';
      this.form.removeControl('id');
      this.form.reset({SStatus: 0}, {onlySelf: true});
    }
  }

  beforeSubmit() {
  }
}
