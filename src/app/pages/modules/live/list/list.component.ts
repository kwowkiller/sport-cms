import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../common/table';
import {HttpClient} from '@angular/common/http';
import {Live} from '../live.module';

@Component({
  selector: 'app-live-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Live> implements OnInit {

  constructor(protected http: HttpClient) {
    super(http);
    this.url = 'live/sys/live/list';
    this.modalShow = true;
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
