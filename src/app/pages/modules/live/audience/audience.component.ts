import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-audience-list',
  templateUrl: './audience.component.html',
  styles: []
})
export class AudienceComponent extends Table<any> implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges) {
    switch (this.queryType) {
      case 'tv':
        this.listUrl = 'live/sys/live/views';
        break;
      case 'live':
        this.listUrl = 'live/sys/host/log/viewlist';
        break;
      default:
    }
    if (this.queryId) {
      this.fetchList('all');
    }
  }

  beforeSearch() {
    this.search.id = this.queryId;
  }

  onSubmitSuccess() {
  }
}
