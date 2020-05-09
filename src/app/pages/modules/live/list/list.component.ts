import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {Live} from '../live.module';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-live-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Live> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'live/sys/live/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }

  onDelete() {
    this.deleteUrl = `live/sys/live/delete/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }

  onDeleteSingle(id: number) {
    this.deleteUrl = `live/sys/live/delete/${id}`;
    this.deleteItem();
  }

  // 直播状态(0:未开播,1:直播中,2:已结束)
  updateStatus(id: number, status: number) {
    this.http.post('live/sys/live/updatestatus', {
      id, liveStatus: status
    }).subscribe(() => {
      this.message.success('操作成功');
      this.fetchList('none');
    });
  }
}
