import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-bar-category',
  templateUrl: './bar-category.component.html',
  styles: []
})
export class BarCategoryComponent extends Table<any> implements OnInit {

  constructor(protected http: HttpClient, protected message: NzMessageService) {
    super(http, message);
  }

  ngOnInit(): void {
    this.fetchList();
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
  }

  onDelete() {
    this.deleteUrl = ``;
    this.deleteItem();
  }
}
