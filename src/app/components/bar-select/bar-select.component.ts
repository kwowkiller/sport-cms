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
      [nzNotFoundContent]="notFoundContent"
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
  private barName = '';

  get notFoundContent() {
    return this.barName.length === 0 ? '请输入球吧名来查找' : '没有找到相关球吧';
  }

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
  }

  onSearch(barName: string) {
    this.barName = barName;
    if (barName.length === 0) {
      this.selectData = [];
      return;
    }
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
