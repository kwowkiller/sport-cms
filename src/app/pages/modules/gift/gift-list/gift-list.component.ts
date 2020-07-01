import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Gift} from '../gift.module';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styles: []
})
export class GiftListComponent extends Table<Gift> implements OnInit {
  modalSendShow = false;
  modalQuantityShow = false;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'app/sys/gift/gift/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.modalShow = false;
    this.modalQuantityShow = false;
    this.modalSendShow = false;
    this.message.success('操作成功');
    this.fetchList('none');
  }
}
