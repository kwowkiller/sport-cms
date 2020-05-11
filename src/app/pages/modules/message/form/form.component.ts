import {Component, OnInit} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {Message} from '../message.module';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent extends ModalForm<Message> implements OnInit {
  get title() {
    return '创建消息';
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
