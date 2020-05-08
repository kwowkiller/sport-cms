import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../common/table';
import {Admin} from '../system.module';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-system-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent extends Table<Admin> implements OnInit {

  constructor(protected http: HttpClient) {
    super(http);
    this.url = 'admin/system/user';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }
}
