import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Feedback} from '../other.module';
import {FeedbackType} from '../../../../common/enum';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styles: []
})
export class FeedbackComponent extends Table<Feedback> implements OnInit {
  feedbackType = FeedbackType;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'app/sys/feedback/user/list';
  }

  ngOnInit(): void {
    this.fetchList();
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }

  onDelete() {
    this.deleteUrl = `app/sys/feedback/user/${Array.from(this.setOfCheckedId).join(',')}`;
    this.deleteItem();
  }
}
