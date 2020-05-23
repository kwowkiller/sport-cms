import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../pages/modules/user/user.module';
import {Pageable} from '../../common/common.model';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {CustomInput} from '../../frame/custom-input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-user-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UserSelectComponent,
      multi: true
    },
  ],
  template: `
    <nz-select
      nzShowSearch
      nzServerSearch
      [nzPlaceHolder]="placeholder"
      (nzOnSearch)="onSearch($event)"
      [nzLoading]="loading"
      [nzNotFoundContent]="notFoundContent"
      [(ngModel)]="model"
      (ngModelChange)="onModelChange($event)"
      nzAllowClear
    >
      <nz-option
        *ngFor="let item of selectData"
        [nzLabel]="item.username"
        [nzValue]="item.id"
      ></nz-option>
    </nz-select>
  `,
  styles: []
})
export class UserSelectComponent extends CustomInput implements OnInit {
  selectData: User[] = [];
  loading = false;
  @Input()
  queryParams: { [key: string]: string } = {};
  @Input()
  placeholder = '输入用户名搜索匹配的用户';
  username = '';

  get notFoundContent() {
    return this.username.length === 0 ? '请输入用户名来查找' : '没有找到相关用户';
  }

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
  }

  onSearch(username: string) {
    this.username = username;
    if (username.length === 0) {
      this.selectData = [];
      return;
    }
    this.loading = true;
    this.http.get<Pageable<User>>('app/sys/app/user/page', {
      params: {
        username,
        ...this.queryParams,
      }
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.selectData = event.data.records;
    });
  }
}
