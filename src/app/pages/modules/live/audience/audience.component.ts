import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-audience-list',
  templateUrl: './audience.component.html',
  styles: []
})
export class AudienceComponent extends Table<any> implements OnInit {
  @Input()
  queryId = 0;
  @Input()
  queryType: 'tv' | 'live';

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
  }

  ngOnInit(): void {
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
