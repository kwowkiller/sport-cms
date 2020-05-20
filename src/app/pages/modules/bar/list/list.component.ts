import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../../frame/table';
import {Bar} from '../bar.module';
import {NzMessageService} from 'ng-zorro-antd';
import * as moment from 'moment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Result} from '../../../../common/common.model';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-bar-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Bar> implements OnInit {
  status = 0;
  dateRange: Date[] = [];
  // 吧主信息
  modalUserShow = false;
  // 审核弹框
  modalApproveShow = false;
  // 审核备注
  modalRemark = false;
  form: FormGroup;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
    private fb: FormBuilder,
  ) {
    super(http, message);
    this.listUrl = 'bar/sys/bar/list';
    this.form = this.fb.group({
      remark: [null],
      approveStatus: [1]
    });
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    // 审核状态
    this.search.approveStatus = this.status;
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD');
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD');
    }
  }

  onSubmitSuccess() {
  }

  updateItem() {
    this.updating = true;
    this.http.put<Result>('bar/sys/bar/approve', {
      ...this.form.value,
      id: this.selected.id,
    }).pipe(
      finalize(() => this.updating = false)
    ).subscribe(event => {
      if (event.code === 200) {
        this.message.success('审核通过');
        this.modalApproveShow = false;
        this.fetchList();
      } else {
        this.message.error('审核失败');
      }
    });
  }

  // 关闭/开启 球吧
  updateItemStatus(item: Bar) {
    this.http.put<Result>('bar/sys/bar/update', {
      id: item.id,
      barStatus: item.barStatus === 0 ? 1 : 0,
    }).pipe().subscribe(event => {
      if (event.code === 200) {
        this.message.success('操作成功');
        this.fetchList();
      } else {
        this.message.error('操作失败');
      }
    });
  }
}
