import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {NewsType} from '../news.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-news-category-form',
  templateUrl: './category-form.component.html',
  styles: []
})
export class CategoryFormComponent extends ModalForm<NewsType> implements OnInit, OnChanges {
  get title() {
    return this.detail ? '编辑资讯' : '新增资讯';
  }

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.submitUrl = 'news/sys/news/type';
    this.form = this.fb.group({
      newsTypeName: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.method = 'PUT';
      this.form.addControl('id', this.fb.control(null));
      this.form.setValue({
        id: this.detail.id,
        newsTypeName: this.detail.newsTypeName,
      });
    } else {
      this.method = 'POST';
      this.form.removeControl('id');
      this.form.reset();
    }
  }

  beforeSubmit() {
  }
}
