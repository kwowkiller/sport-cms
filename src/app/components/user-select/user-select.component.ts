import {Component, OnInit} from '@angular/core';
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
      nzPlaceHolder="输入用户名搜索"
      (nzOnSearch)="onSearch($event)"
      [nzLoading]="loading"
      nzNotFoundContent="没有相关用户"
      [(ngModel)]="model"
      (ngModelChange)="onModelChange($event)"
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

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
  }

  onSearch(username: string) {
    this.loading = true;
    this.http.get<Pageable<User>>('app/sys/app/user/page', {
      params: {
        username,
        // 高级认证过的
        authenStatus: '2',
      }
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.selectData = event.data.records;
    });
  }
}
