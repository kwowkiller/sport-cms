import {Component, OnInit} from '@angular/core';
import {ModalForm} from '../../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {Feedback} from '../../other.module';
import {FeedbackType} from '../../../../../common/enum';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styles: [
    '.item{display: flex;margin-bottom: 12px}',
    '.item>label{width: 6em;text-align: right;}',
    '.item>label:after{content:"："}',
  ]
})
export class FeedbackDetailComponent extends ModalForm<Feedback> implements OnInit {
  feedbackType = FeedbackType;

  constructor(http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
