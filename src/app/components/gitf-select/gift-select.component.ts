import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomInput} from '../../frame/custom-input';
import {Gift} from '../../pages/modules/gift/gift.module';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../../common/common.model';
import {finalize} from 'rxjs/operators';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-gift-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GiftSelectComponent,
      multi: true
    },
  ],
  template: `
    <nz-select
      nzShowSearch
      nzPlaceHolder="请选择礼物"
      [nzLoading]="loading"
      [(ngModel)]="model"
      (ngModelChange)="onModelChange($event)"
    >
      <nz-option
        *ngFor="let item of selectData"
        [nzLabel]="item.giftName"
        [nzValue]="item.id"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class GiftSelectComponent extends CustomInput implements OnInit {
  selectData: Gift[] = [];
  loading = false;
  @Output()
  selectItem = new EventEmitter<Gift>();

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<Pageable<Gift>>('app/sys/gift/gift/page', {
      params: {
        pageSize: '1000',
      }
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.selectData = event.data.records;
    });
  }

  onModelChange(value: any) {
    this.selectItem.emit(this.selectData.find(i => i.id === value));
    super.onModelChange(value);
  }
}
