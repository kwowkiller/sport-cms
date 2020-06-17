import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Table} from '../../../../frame/table';

@Component({
  selector: 'app-scheme-user',
  templateUrl: './scheme-user.component.html',
  styles: []
})
export class SchemeUserComponent extends Table<any> implements OnInit {

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
