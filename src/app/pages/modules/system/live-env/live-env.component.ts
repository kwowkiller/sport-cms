import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-live-env',
  templateUrl: './live-env.component.html',
  styles: []
})
export class LiveEnvComponent extends Table<any> implements OnInit {

  constructor(protected http: HttpClient, protected message: NzMessageService) {
    super(http, message);
  }

  ngOnInit(): void {
    this.fetchList();
  }

  onSubmitSuccess() {
  }

  beforeSearch() {
  }

  onDelete() {
  }
}
