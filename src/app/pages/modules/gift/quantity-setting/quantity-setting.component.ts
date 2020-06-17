import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ModalForm} from '../../../../frame/modal-form';

@Component({
  selector: 'app-quantity-setting',
  templateUrl: './quantity-setting.component.html',
  styles: []
})
export class QuantitySettingComponent extends ModalForm<any> implements OnInit {

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
