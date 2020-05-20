import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Live2} from '../../live.module';

@Component({
  selector: 'app-live-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Live2> implements OnInit {
  tabIndex = 0;
  status = 0;
  modalSetUser = false;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'live/sys/host/log/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }

  onDelete() {
  }
}
