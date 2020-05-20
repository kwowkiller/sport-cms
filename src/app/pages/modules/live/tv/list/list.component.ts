import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {Live} from '../../live.module';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-tv-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Live> implements OnInit {
  tabIndex = 0;
  modalSetUser = false;

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
    this.message.success('操作成功');
  }

  onDelete() {
    this.deleteUrl = `live/sys/live/delete?ids=${Array.from(this.setOfCheckedId.values()).join(',')}`;
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
