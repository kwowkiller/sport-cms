import {Component, Input, OnInit} from '@angular/core';
import {LiveTag} from '../live.module';
import {Pageable} from '../../../../common/common.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-live-tag-select',
  template: `
    <nz-select
      nzPlaceHolder="输入标签名精确匹配"
      nzShowSearch
      nzServerSearch
      (nzOnSearch)="fetchSelectData($event)"
    >
      <nz-option
        *ngFor="let item of selectedData"
        [nzLabel]="item.tag"
        [nzValue]="item.id"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class TagSelectComponent implements OnInit {
  selectedData: LiveTag[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  fetchSelectData(tag: string) {
    this.http.get<Pageable<LiveTag>>('live/sys/tag/list', {
      params: {tag}
    }).subscribe(event => {
      this.selectedData = event.data.records;
    });
  }
}
