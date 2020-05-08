import {EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Result} from './common.model';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

export abstract class ModalForm<T> {
  // 编辑对象 直接从表单中带过来
  @Input()
  detail: T;
  // 打开之后请求接口查询 detail
  @Input()
  id: number;
  // 接口加载详情
  loading = false;
  @Input()
  visiable: boolean;
  @Output()
  visiableChange = new EventEmitter<boolean>();
  form: FormGroup;
  submiting = false;
  // 提交成功回调
  @Output()
  submitSuccess = new EventEmitter<void>();
  // 新增 或 更新
  method: 'POST' | 'PUT' = 'POST';
  // 表单提交地址
  submitUrl = '';

  protected constructor(protected http: HttpClient) {
  }

  // 提交前的额外处理
  abstract beforeSubmit();

  // 提交表单
  submit() {
    this.beforeSubmit();
    this.submiting = true;
    this.http.request<Result>(this.method, this.submitUrl, {
      body: this.form.value
    }).pipe(
      finalize(() => this.submiting = false)
    ).subscribe(event => {
      if (event.code === 200) {
        this.visiableChange.emit(false);
        this.submitSuccess.emit();
      } else {
        // 失败
      }
    });
  }
}
