import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {HttpClient} from '@angular/common/http';
import {AuthInfo} from '../user.module';
import * as moment from 'moment';
import {NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {Result} from '../../../../common/common.model';
import {SexType} from '../../../../common/enum';

@Component({
  selector: 'app-user-auth-list',
  templateUrl: './auth-list.component.html',
  styles: []
})
export class AuthListComponent extends Table<AuthInfo> implements OnInit {
  dateRange: Date[] = [];
  modalDetailShow = false;
  modalActionShow = false;
  form: FormGroup;
  sexType = SexType;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private fb: FormBuilder,
  ) {
    super(http, message);
    this.listUrl = 'app/sys/app/user/auth/page';
    this.form = this.fb.group({
      remark: [null],
      status: [1]
    });
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    if (this.dateRange.length !== 0) {
      this.search.authTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.authTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }

  onSubmitSuccess() {
  }

  updateItem() {
    this.updating = true;
    this.http.post<Result>('app/sys/app/user/auth/status', {
      ...this.form.value,
      id: this.selected.id,
    }).pipe(
      finalize(() => this.updating = false)
    ).subscribe(event => {
      if (event.code === 200) {
        this.message.success('审核成功');
        this.modalActionShow = false;
        this.fetchList();
      } else {
        this.message.error('审核失败');
      }
    });
  }
}
