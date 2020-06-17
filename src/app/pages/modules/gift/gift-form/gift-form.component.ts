import {Component, OnInit} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-gift-form',
  templateUrl: './gift-form.component.html',
  styles: []
})
export class GiftFormComponent extends ModalForm<any> implements OnInit {
  get title() {
    return '编辑礼物';
  }

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
