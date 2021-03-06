import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Banner} from '../banner.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-banner-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Banner> implements OnInit, OnChanges {
  get title() {
    return this.detail ? '编辑banner' : '新增banner';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      bannerName: [null, [Validators.required]],
      url: [null, [Validators.required]],
      linkUrl: [null, [Validators.required]],
      moduleType: [null, [Validators.required]],
      orderNum: [null, [Validators.required]],
    });
    this.submitUrl = 'news/sys/banner/add';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.form.addControl('id', this.fb.control(null));
      this.method = 'PUT';
      this.submitUrl = 'news/sys/banner/update';
      this.form.setValue({
        id: this.detail.id,
        bannerName: this.detail.bannerName,
        url: this.detail.url,
        linkUrl: this.detail.linkUrl,
        moduleType: this.detail.moduleType,
        orderNum: this.detail.orderNum,
      });
    } else {
      this.form.removeControl('id');
      this.form.reset();
      this.method = 'POST';
      this.submitUrl = 'news/sys/banner/add';
    }
  }

  beforeSubmit() {
  }

}
