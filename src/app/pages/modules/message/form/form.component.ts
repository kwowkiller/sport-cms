import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Message} from '../message.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Message> implements OnInit, OnChanges {

  get title() {
    return '创建消息';
  }

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
    this.form = this.fb.group({
      content: [null, [Validators.required]],
      userId: [0],
      sendTime: [null, [Validators.required]]
    });
    this.submitUrl = 'app/sys/message';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  beforeSubmit() {
    // if (!this.form.value.userId) {
    //   this.form.controls.userId.setValue(0);
    // }
  }
}
