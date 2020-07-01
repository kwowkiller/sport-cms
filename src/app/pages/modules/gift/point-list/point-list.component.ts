import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Point} from '../gift.module';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styles: []
})
export class PointListComponent extends Table<Point> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'app/sys/points/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.fetchList('all');
    this.message.success('操作成功');
  }
}
