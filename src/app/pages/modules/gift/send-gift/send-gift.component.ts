import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Gift} from '../gift.module';

@Component({
  selector: 'app-send-gift',
  templateUrl: './send-gift.component.html',
  styles: []
})
export class SendGiftComponent extends ModalForm<any> implements OnInit, OnChanges {
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
      levelId: [null],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.visiable) {
      this.form.reset({sendType: 0}, {onlySelf: true});
    }
  }


  beforeSubmit() {
    if (this.form.value.sendType === 0) {
      this.form.value.levelId = null;
    } else {
      this.form.value.userId = null;
      // this.form.value.levelId = (this.form.value.levelId as []).join(',');
    }
  }

}
