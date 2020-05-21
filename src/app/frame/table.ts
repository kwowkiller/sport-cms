import {HttpClient} from '@angular/common/http';
import {Pageable, Result} from '../common/common.model';
import {finalize} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';

export abstract class Table<T> {
  // 唯一标识字段 默认id
  idKey = 'id';
  list: T[] = [];
  // 选中的项
  selected: T;
  // 表单加载
  loading = false;
  // 更新项
  updating = false;
  total = 0;
  // 查询参数
  search: {
    pageNum?: number,
    pageSize?: number,
    [key: string]: any,
  } = {
    pageNum: 1,
    pageSize: 10,
  };
  // 排序
  orders: {
    asc: boolean,
    column: string,
  }[] = [];
  listUrl = '';
  // 显示表单modal
  modalShow = false;
  setOfCheckedId = new Set<number>();
  // 删除项
  deleteUrl = '';
  deleteMethod: 'PUT' | 'POST' | 'DELETE' = 'DELETE';

  get allChecked() {
    if (this.list.length === 0) {
      return false;
    }
    return this.list.every(i => this.setOfCheckedId.has(i[this.idKey]));
  }

  onItemChecked(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onAllChecked(checked: boolean): void {
    const ids = this.list.map<number>(i => i[this.idKey]);
    ids.forEach(id => {
      if (checked) {
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.delete(id);
      }
    });
  }

  protected constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
  }

  // 搜索前处理特殊参数
  abstract beforeSearch();

  // 排序
  onSortChange(sort: 'ascend' | 'descend' | null, field: string) {
    const find = this.orders.find(i => i.column === field);
    if (sort != null) {
      if (find) {
        find.asc = sort === 'ascend';
      } else {
        this.orders.push({
          asc: sort === 'ascend',
          column: field,
        });
      }
    } else {
      this.orders.splice(this.orders.findIndex(i => i.column === field), 1);
    }
    this.fetchList();
  }

  // modal表单提交成功后回调
  abstract onSubmitSuccess();

  /**
   *
   * @param reset 清除全部 只清除page信息
   */
  fetchList(reset: 'all' | 'page' | 'none' = 'none') {
    switch (reset) {
      case 'all':
        this.search = {
          pageNum: 1,
          pageSize: 10,
        };
        break;
      case 'page':
        this.search.pageNum = 1;
        this.search.pageSize = 10;
        break;
      case 'none':
        break;
    }
    this.beforeSearch();
    // 拼接排序参数
    const orders: { [key: string]: string } = {};
    if (this.orders.length > 0) {
      this.orders.forEach((item, index) => {
        orders[`orders[${index}].asc`] = String(item.asc);
        orders[`orders[${index}].column`] = item.column;
      });
    }
    this.loading = true;
    this.http.get<Pageable<T>>(this.listUrl, {
      params: {
        ...this.search,
        ...orders,
      }
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      if (event.data == null) {
        this.message.info('数据为空，接口返回null');
        return;
      }
      if (!event.data.records) {
        this.message.warning('返回数据格式不正确');
        return;
      }
      this.total = event.data.total;
      this.list = event.data.records;
    });
  }

  /**
   * 删除对象
   */
  deleteItem() {
    this.http.request<Result>(this.deleteMethod, this.deleteUrl).pipe(
    ).subscribe(event => {
      if (event.code === 200) {
        this.setOfCheckedId.clear();
        this.message.success('删除成功');
        this.fetchList('all');
      } else {
        this.message.error('删除失败');
      }
    });
  }
}


