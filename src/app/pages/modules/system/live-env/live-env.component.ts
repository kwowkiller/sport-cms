import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {LiveEnv} from '../system.module';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-live-env',
  templateUrl: './live-env.component.html',
  styles: []
})
export class LiveEnvComponent extends Table<LiveEnv> implements OnInit {

  constructor(protected http: HttpClient, protected message: NzMessageService) {
    super(http, message);
    this.listUrl = 'live/sys/host/setup/page';
  }

  ngOnInit(): void {
    this.fetchList();
  }

  onSubmitSuccess() {
    this.message.success('操作成功');
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onDelete() {
    this.deleteUrl = `live/sys/host/setup/delete/${Array.from(this.setOfCheckedId).join(',')}`;
    this.deleteItem();
  }

  updateItem(item: LiveEnv) {
    this.http.put<Result>(`live/sys/host/setup/enable/${item.id}`, {}).subscribe(event => {
      if (event.code === 200) {
        this.onSubmitSuccess();
      } else {
        this.message.error(event.message);
      }
    });
  }
}

