import {Component, OnInit} from '@angular/core';
import {CustomInput} from '../../frame/custom-input';
import {HttpClient} from '@angular/common/http';
import {Bar} from '../../pages/modules/bar/bar.module';
import {Pageable} from '../../common/common.model';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-bar-select',
  template: `
    <nz-select
      nzShowSearch
      nzServerSearch
      nzPlaceHolder="输入球吧名搜索"
      (nzOnSearch)="onSearch($event)"
      [nzLoading]="loading"
      nzNotFoundContent="没有相关球吧"
      [(ngModel)]="model"
      (ngModelChange)="onModelChange($event)"
    >
      <nz-option
        *ngFor="let item of selectData"
        [nzLabel]="item.barName"
        [nzValue]="item.id"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class BarSelectComponent extends CustomInput implements OnInit {
  selectData: Bar[] = [];
  loading = false;

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
  }

  onSearch(barName: string) {
    this.loading = true;
    this.http.get<Pageable<Bar>>('bar/sys/bar/list', {
      params: {
        // 审核通过的
        approveStatus: '1',
        barName
      }
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.selectData = event.data.records;
    });
  }
}
