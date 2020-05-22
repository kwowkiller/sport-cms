import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from '../../../../frame/table';
import {Result} from '../../../../common/common.model';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent extends Table<Comment> implements OnInit, OnChanges {
  @Input()
  queryId: number;

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'bar/sys/postingscomment/list';
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.queryId) {
      this.fetchList('all');
    }
  }

  beforeSearch() {
    this.search.parentId = this.queryId;
  }

  onSubmitSuccess() {
  }

  onDelete(id: number) {
    this.http.put<Result>('bar/sys/postingscomment/delete', {
      id, isDel: 1
    }).subscribe(event => {
      if (event.code === 200) {
        this.fetchList('page');
        this.message.success('删除成功');
      } else {
        this.message.error('删除失败');
      }
    });
  }
}

interface Comment {
  commentLikeCount: number;
  context: string;
  createTime: string;
  floorNum: number;
  id: number;
  isDel: number;
  phone: string;
  updateTime: string;
  userId: number;
  username: string;
  headerImg: string;
}
