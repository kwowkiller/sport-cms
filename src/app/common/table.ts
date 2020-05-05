import {HttpClient} from '@angular/common/http';
import {Pageable} from './common.model';
import {finalize} from 'rxjs/operators';

export abstract class Table<T> {
  list: T[] = [];
  loading = false;
  total = 0;
  search: {
    pageNum: number,
    pageSize: number,
    [key: string]: any,
  } = {
    pageNum: 1,
    pageSize: 10,
  };
  url = '';

  protected constructor(protected http: HttpClient) {
  }

  // 搜索前处理特殊参数
  abstract beforeSearch();

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
    this.loading = true;
    this.http.get<Pageable<T>>(this.url, {
      params: this.search
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.total = event.data.total;
      this.list = event.data.records;
    });
  }
}
