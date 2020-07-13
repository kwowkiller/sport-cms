import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {Live2} from '../../live.module';

@Component({
  selector: 'app-live-data',
  templateUrl: './modal-data.component.html',
  styles: []
})
export class ModalDataComponent extends ModalForm<Live2> implements OnInit, OnChanges {
  detail2: Detail;

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const idChange = changes.queryId;
    if (idChange && !idChange.firstChange && this.visiable) {
      this.http.get<{
        code,
        data: Detail,
      }>(`live/sys/host/log/detail?id=${this.queryId}`).subscribe(event => {
        this.detail2 = event.data;
      });
    }
  }

  beforeSubmit() {
  }
}

interface Detail {
  createTime: string;
  currentViews: number;
  fromTime: string;
  // 礼物总值
  giftAmount: number;
  giveQuantity: number;
  headerImg: string;
  hostId: number;
  hostTag: number;
  id: number;
  liveImg: string;
  liveTitle: string;
  nickname: string;
  phone: string;
  sex: number;
  sstatus: number;
  subscribeCount: number;
  totalViews: number;
  userId: number;
  username: string;
  // 结束时间
  toTime: string;
}
