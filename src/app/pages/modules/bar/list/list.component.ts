import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../../frame/table';
import {Bar} from '../bar.module';
import {NzMessageService} from 'ng-zorro-antd';
import * as moment from 'moment';
import {Result} from '../../../../common/common.model';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-bar-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Bar> implements OnInit {
  dateRange: Date[] = [];
  // 吧主信息
  modalUserShow = false;
  // 审核弹框
  modalApproveShow = false;
  // 审核备注
  modalRemark = false;
  tabIndex = 0;
  subTableType: 'user' | 'blog';

  get subTableTitle() {
    let str = '';
    switch (this.subTableType) {
      case 'user':
        str = '关注用户';
        break;
      case 'blog':
        str = '贴子';
        break;
    }
    return `${this.selected.barName} - ${str}`;
  }

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'bar/sys/bar/list';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
    // 审核状态
    this.search.approveStatus = 1;
    if (this.dateRange.length !== 0) {
      this.search.createTimeFrom = moment(this.dateRange[0]).format('YYYY-MM-DD') + ' 00:00:00';
      this.search.createTimeTo = moment(this.dateRange[1]).format('YYYY-MM-DD') + ' 00:00:00';
    }
  }

  onSubmitSuccess() {
  }

  // 关闭/开启 球吧
  updateItemStatus(item: Bar) {
    this.http.put<Result>('bar/sys/bar/open', {
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

  // 设置推荐
  updateItemRecommend(item: Bar) {
    this.updating = true;
    this.http.get<Result>(`bar/sys/bar/recommend/${item.id}/${item.isRecommend === 0 ? 1 : 0}`, {}).pipe(
      finalize(() => this.updating = false)
    ).subscribe(event => {
      if (event.code === 200) {
        this.message.success('设置成功');
        this.fetchList();
      } else {
        this.message.error('设置失败');
      }
    });
  }

  onDeleteSingle(id: number) {
    this.deleteUrl = `bar/sys/bar/delete/${id}`;
    this.deleteItem();
  }
}
