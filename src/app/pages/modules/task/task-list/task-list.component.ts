import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Task} from '../task.module';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: []
})
export class TaskListComponent extends Table<Task> implements OnInit {

  constructor(http: HttpClient, protected message: NzMessageService) {
    super(http, message);
    this.listUrl = 'app/sys/task/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.message.success('操作成功');
    this.fetchList('all');
  }

  updateItem(item: Task) {
    this.http.put<Result>(`app/sys/task/status/${item.id}`, {}).subscribe(event => {
      if (event.code === 200) {
        this.fetchList('none');
        this.message.success('操作成功');
      } else {
        this.message.error(event.message);
      }
    });
  }
}
