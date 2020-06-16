import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-gift-log',
  templateUrl: './gift-log.component.html',
  styles: []
})
export class GiftLogComponent extends Table<any> implements OnInit {
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
