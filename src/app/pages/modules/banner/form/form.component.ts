import {Component, OnInit} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Banner} from '../banner.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-banner-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Banner> implements OnInit {
  get title() {
    return '新增banner';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({});
    this.submitUrl = '';
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }

}
