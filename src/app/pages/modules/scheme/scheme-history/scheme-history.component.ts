import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {SchemeUser} from '../scheme.module';

@Component({
  selector: 'app-scheme-history',
  templateUrl: './scheme-history.component.html',
  styles: []
})
export class SchemeHistoryComponent extends ModalForm<SchemeUser> implements OnInit, OnChanges {
  historyDetail: Detail;

  constructor(http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!(this.detail && this.visiable)) {
      return;
    }
    this.http.get<{
      code, data: Detail,
    }>('match/sys/match/program/user/detail', {
      params: {userId: this.detail.userId.toString()}
    }).subscribe(event => {
      this.historyDetail = event.data;
    });
  }

  beforeSubmit() {
  }
}

interface Detail {
  amountCount: number;
  applyCount: number;
  buyCount: number;
  nickname: string;
  pushCount: number;
  pushTime: string;
  userId: number;
}
