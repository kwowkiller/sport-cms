import {Component, OnInit} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Gift} from '../gift.module';

@Component({
  selector: 'app-send-gift',
  templateUrl: './send-gift.component.html',
  styles: []
})
export class SendGiftComponent extends ModalForm<any> implements OnInit {
  selectedGift: Gift;

  get total() {
    if (this.selectedGift && this.form.value.quantity) {
      return this.selectedGift.price * this.form.value.quantity;
    }
    return 0;
  }

  constructor(http: HttpClient, private fb: FormBuilder) {
    super(http);
    this.submitUrl = 'app/sys/user/gift/give';
    this.form = this.fb.group({
      giftId: [null, [Validators.required]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      // 是否群发(0:单发1:群发)
      sendType: [0],
      userId: [null],
    });
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }

}
