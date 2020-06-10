import {Component, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {CustomInput} from '../../frame/custom-input';
import {Category} from '../../pages/modules/other/other.module';
import {Pageable} from '../../common/common.model';
import {finalize} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-category-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CategorySelectComponent,
      multi: true
    },
  ],
  template: `
    <nz-select
      nzShowSearch
      [nzLoading]="loading"
      [(ngModel)]="model"
      (ngModelChange)="onModelChange($event)"
      nzAllowClear
    >
      <nz-option
        *ngFor="let item of selectData"
        [nzLabel]="item.typeName"
        [nzValue]="item.id"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class CategorySelectComponent extends CustomInput implements OnInit {
  selectData: Category[] = [];
  loading = false;

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<Pageable<Category>>('live/sys/liveType/page', {
      params: {
        pageSize: '10000'
      }
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.selectData = event.data.records;
    });
  }

}
