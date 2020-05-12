import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Word} from '../other.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-word-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Word> implements OnInit, OnChanges {
  get title() {
    return this.detail ? '编辑敏感词' : '创建敏感词';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      word: [null, [Validators.required]]
    });
    this.submitUrl = 'app/sys/words/add';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.form.addControl('id', this.fb.control(this.detail.id));
      this.form.controls.word.setValue(this.detail.word);
      this.method = 'PUT';
      this.submitUrl = 'app/sys/words/update';
    } else {
      this.form.removeControl('id');
      this.form.reset();
      this.method = 'POST';
      this.submitUrl = 'app/sys/words/add';
    }
  }

  beforeSubmit() {
  }
}
