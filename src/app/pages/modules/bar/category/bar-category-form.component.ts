import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {NewsType} from '../../news/news.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-bar-category-form',
  templateUrl: './bar-category-form.component.html',
  styles: []
})
export class BarCategoryFormComponent extends ModalForm<NewsType> implements OnInit, OnChanges {

  get title() {
    return this.detail ? '编辑' : '新增';
  }

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.submitUrl = '';
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.method = 'PUT';
      this.submitUrl = '';
      this.form.setValue({});
    } else {
      this.method = 'POST';
      this.submitUrl = '';
      this.form.reset();
    }
  }
}
