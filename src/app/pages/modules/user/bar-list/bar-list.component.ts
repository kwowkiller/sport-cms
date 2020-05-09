import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Bar} from '../../bar/bar.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-bar-list',
  templateUrl: './bar-list.component.html',
  styles: []
})
export class BarListComponent extends Table<Bar> implements OnInit, OnChanges {
  @Input()
  userId: number;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listUrl = `app/sys/app/user/bar/${this.userId}`;
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
