import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Tags} from '../other.module';

@Component({
  selector: 'app-tags-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Tags> implements OnInit, OnChanges {
  get title() {
    return this.detail ? '编辑标签' : '创建标签';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      liveType: [0, [Validators.required]],
      tag: [null, [Validators.required]],
    });
    this.submitUrl = 'live/sys/tag/add';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.form.addControl('id', this.fb.control(this.detail.id));
      this.form.setValue({
        id: this.detail.id,
        tag: this.detail.tag,
        liveType: this.detail.liveType,
      });
      this.method = 'PUT';
      this.submitUrl = 'live/sys/tag/update';
    } else {
      this.form.removeControl('id');
      this.form.reset();
      this.method = 'POST';
      this.submitUrl = 'live/sys/tag/add';
    }
  }

  beforeSubmit() {
  }
}
