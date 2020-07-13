import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-anchor-modal-data',
  templateUrl: './modal-data.component.html',
  styles: [
    'p{display: flex;}'
  ]
})
export class ModalDataComponent extends ModalForm<{
  createTime: string;
  headerImg: string;
  hostLevel: number;
  id: number;
  lastStartTime: string;
  liveStatus: number;
  liveUrl: string;
  phone: string;
  sex: number;
  sstatus: number;
  userId: number;
  username: string;
  authenTime: string;
  expireValue: number;
  forbiddenFrom: string;
  forbiddenTo: string;
  idNo: string;
  levelId: number;
  levelName: string;
  livingTimes: number;
  nickname: string;
  subscribeCount: number;
  totalAmountGift: number;
  totalQuantityGift: number;
  totalViews: number;
  totalLengthOfTime: number;
}> implements OnInit, OnChanges {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const idChange = changes.queryId;
    if (idChange && !idChange.firstChange && this.visiable) {
      this.detailUrl = `live/sys/host/host/${this.queryId}`;
      this.fetchDetail();
    }
  }
}
