import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {AnchorAudit} from '../anchor.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Result} from '../../../../common/common.model';
import * as moment from 'moment';
import {SexType} from '../../../../common/enum';

@Component({
  selector: 'app-anchor-list1',
  templateUrl: './list1.component.html',
  styles: []
})
export class List1Component extends Table<AnchorAudit> implements OnInit {
  form: FormGroup;
  modalInfoShow = false;
  dateRange: Date[] = [];
  sexType = SexType;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private fb: FormBuilder,
  ) {
    super(http, message);
    this.form = this.fb.group({
      sStatus: [1],
      approveRemark: [null],
    });
    this.listUrl = 'live/sys/host/apply/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }

  onSubmitSuccess() {
  }

  updateItem() {
    this.http.put<Result>(`live/sys/host/apply/approve`, {
      id: this.selected.id,
      ...this.form.value,
    }).pipe(
    ).subscribe(event => {
      if (event.code === 200) {
        this.message.success('审核成功');
        this.selected = null;
        this.modalShow = false;
        this.fetchList();
      } else {
        this.message.error('审核失败:' + event.message);
      }
    });
  }
}
