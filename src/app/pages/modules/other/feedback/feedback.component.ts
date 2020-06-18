import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styles: []
})
export class FeedbackComponent extends Table<any> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
  }

  ngOnInit(): void {
    this.fetchList();
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }

  onDelete() {
  }
}
