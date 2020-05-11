import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Message} from '../message.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-message-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Message> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = '消息列表接口';
  }

  ngOnInit(): void {
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
