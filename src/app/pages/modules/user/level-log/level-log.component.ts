import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Table} from '../../../../frame/table';

@Component({
  selector: 'app-level-log',
  templateUrl: './level-log.component.html',
  styles: []
})
export class LevelLogComponent extends Table<any> implements OnInit {
  dateRange: Date[] = [];

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
