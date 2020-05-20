import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-anchor-modal-data',
  templateUrl: './modal-data.component.html',
  styles: [
    'p{display: flex;justify-content: space-between}'
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
      this.fetchDetailOnly();
    }
  }
}
