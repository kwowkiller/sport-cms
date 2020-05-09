import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LiveTag} from '../live.module';
import {Pageable} from '../../../../common/common.model';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {CustomInput} from '../../../../frame/custom-input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-live-tag-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagSelectComponent,
      multi: true
    },
  ],
  template: `
    <nz-select
      nzPlaceHolder="请先选择直播分类"
      [nzDisabled]="type==null"
      [nzLoading]="loading"
      [(ngModel)]="model"
      (ngModelChange)="onModelChange($event)"
    >
      <nz-option
        *ngFor="let item of selectData"
        [nzLabel]="item.tag"
        [nzValue]="item.id"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class TagSelectComponent extends CustomInput implements OnInit, OnChanges {
  @Input()
  type: number = null;
  selectData: LiveTag[] = [];
  loading = false;

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type && this.type != null) {
      this.fetchSelectData();
      // setTimeout(() => {
      //   this.onModelChange(null);
      // }, 0);
    }
  }

  fetchSelectData() {
    this.loading = true;
    this.http.get<Pageable<LiveTag>>('live/sys/tag/list', {
      params: {
        liveType: String(this.type),
        pageSize: '20',
      }
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.selectData = event.data.records;
    });
  }
}
