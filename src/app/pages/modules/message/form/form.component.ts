import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Message} from '../message.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-message-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Message> implements OnInit, OnChanges {

  get title() {
    return this.detail ? '编辑消息' : '创建消息';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {
    super(http);
    this.form = this.fb.group({
      content: [null, [Validators.required]],
      sendTime: [null, [Validators.required]],
      type: [0, [Validators.required]],
      levelId: [null],
      rangeType: [0],
    });
    this.submitUrl = 'app/sys/message';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.method = 'PUT';
      const arr = this.detail.levelId.split(',').filter(i => i.length > 0).map(i => Number(i));
      this.form.setValue({
        content: this.detail.content,
        sendTime: new Date(this.detail.sendTime),
        type: this.detail.type,
        levelId: arr,
        rangeType: arr.includes(0) ? 0 : 1,
      });
    } else {
      this.method = 'POST';
      this.form.reset({
        rangeType: 0,
      }, {onlySelf: true});
    }
  }

  onFail(error: string) {
    this.message.error(error);
  }

  beforeSubmit() {
    if (this.form.value.rangeType === 0) {
      this.form.value.levelId = 0;
    } else {
      this.form.value.levelId = (this.form.value.levelId as []).filter(i => i !== 0).join(',');
    }
    delete this.form.value.rangeType;
    // throw new Error('test');
    if (this.detail) {
      this.form.value.id = this.detail.id;
    }
  }
}
