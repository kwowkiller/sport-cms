import {Component, Input, OnInit} from '@angular/core';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-set-user',
  templateUrl: './set-user.component.html',
  styles: []
})
export class SetUserComponent extends ModalForm<any> implements OnInit {
  // 观看人数  订阅人数
  @Input()
  type: 'watching' | 'subscriber';

  constructor(
    protected http: HttpClient,
    private fb: FormBuilder
  ) {
    super(http);
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
  }

  beforeSubmit() {
  }
}
