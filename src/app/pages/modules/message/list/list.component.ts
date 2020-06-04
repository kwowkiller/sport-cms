import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Message} from '../message.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Result} from '../../../../common/common.model';

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
    this.listUrl = 'app/sys/message/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.message.success('保存成功');
    this.fetchList('all');
  }

  onDelete() {
    this.deleteUrl = `app/sys/message/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }

  onDeleteSingle(id: number) {
    this.deleteUrl = `app/sys/message/${id}`;
    this.deleteItem();
  }

  updateItem(id: number) {
    this.http.put<Result>(`app/sys/message/send/${id}`, {}).subscribe(event => {
      if (event.code === 200) {
        this.message.success('发送成功');
        this.fetchList();
      } else {
        this.message.error('发送失败');
      }
    });
  }
}
