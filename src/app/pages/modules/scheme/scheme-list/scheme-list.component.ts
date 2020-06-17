import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {Table} from '../../../../frame/table';

@Component({
  selector: 'app-scheme-list',
  templateUrl: './scheme-list.component.html',
  styles: []
})
export class SchemeListComponent extends Table<any> implements OnInit {
  tabIndex = 1;

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
