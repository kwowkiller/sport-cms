import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: []
})
export class TaskListComponent extends Table<any> implements OnInit {

  constructor(http: HttpClient, protected message: NzMessageService) {
    super(http, message);
    this.listUrl = '';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
