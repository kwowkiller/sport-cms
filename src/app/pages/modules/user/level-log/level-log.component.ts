import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Table} from '../../../../frame/table';
import * as moment from 'moment';

@Component({
  selector: 'app-level-log',
  templateUrl: './level-log.component.html',
  styles: []
})
export class LevelLogComponent extends Table<LevelLog> implements OnInit {
  @Input()
  userId: number;
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
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }

  onSubmitSuccess() {
  }
}

interface LevelLog {
  id: number;
}
