import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalForm} from '../../../../frame/modal-form';
import {Gift} from '../gift.module';
import {forkJoin} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-quantity-setting',
  templateUrl: './quantity-setting.component.html',
  styles: []
})
export class QuantitySettingComponent extends ModalForm<Gift> implements OnInit, OnChanges {
  forms: FormGroup[] = [];
  deleteIds = [];

  get disabled() {
    return !this.forms.every(f => f.valid);
  }

  constructor(
    http: HttpClient,
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.detail && this.visiable) {
      // 先清空
      this.forms = [];
      this.http.get<{
        code,
        data: {
          description: string,
          giftId: number,
          giveQuantity: number,
          id: number,
        }[],
      }>(`app/sys/gift/give/list/${this.detail.id}`).subscribe(event => {
        event.data.forEach(item => {
          this.forms.push(this.fb.group({
            id: [item.id],
            giftId: [item.giftId],
            giveQuantity: [item.giveQuantity, [Validators.required]],
            description: [item.description, [Validators.required]],
          }));
        });
      });
    }
  }

  beforeSubmit() {
  }

  deleteItem(id: number, index: number) {
    this.deleteIds.push(id);
    this.forms.splice(index, 1);
  }

  submit() {
    const requests = [];
    // 删除请求
    if (this.deleteIds.length > 0) {
      requests.push(this.http.delete(`app/sys/gift/give/delete/${this.deleteIds.join(',')}`));
    }
    // 更新请求
    const putRequest = this.forms.filter(item => item.touched && !item.pristine).map(item => {
      return this.http.put('app/sys/gift/give/update', item.value);
    });
    // 统一请求
    requests.push(...putRequest);
    if (requests.length > 0) {
      this.submiting = true;
      forkJoin(requests).pipe(
        finalize(() => this.submiting = false),
      ).subscribe(event => {
        this.submitSuccess.emit();
      });
    } else {
      this.submitSuccess.emit();
    }
  }
}
