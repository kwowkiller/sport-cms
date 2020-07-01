import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Gift} from '../gift.module';

@Component({
  selector: 'app-gift-form',
  templateUrl: './gift-form.component.html',
  styles: []
})
export class GiftFormComponent extends ModalForm<Gift> implements OnInit, OnChanges {
  get title() {
    return this.detail ? '编辑礼物' : '新增礼物';
  }

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.form = this.fb.group({
      giftName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      giftImage: [null, [Validators.required]],
      giftTag: [null, [Validators.required]],
      LLimit: [null, [Validators.required]],
      orderNum: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail) {
      this.submitUrl = 'app/sys/gift/update';
      this.method = 'PUT';
      this.form.setValue({
        giftName: this.detail.giftName,
        price: this.detail.price,
        giftImage: this.detail.giftImage,
        giftTag: this.detail.giftTag,
        LLimit: this.detail.llimit,
        orderNum: this.detail.orderNum,
      });
    } else {
    }
  }

  beforeSubmit() {
    if (this.detail) {
      this.form.value.id = this.detail.id;
    }
  }
}
