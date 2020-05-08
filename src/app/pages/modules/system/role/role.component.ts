import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../common/table';
import {Role} from '../system.module';
import {HttpClient} from '@angular/common/http';
import {Result} from '../../../../common/common.model';

@Component({
  selector: 'app-system-role',
  templateUrl: './role.component.html',
  styles: []
})
export class RoleComponent extends Table<Role> implements OnInit {

  constructor(protected http: HttpClient) {
    super(http);
    this.idKey = 'roleId';
    this.url = 'admin/system/role/page';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.fetchList('all');
  }

  remove(id: number) {
    this.http.delete<Result>(`admin/system/role/delete/${id}`).subscribe(event => {
      if (event.code === 200) {
        this.onSubmitSuccess();
      }
    });
  }
}
