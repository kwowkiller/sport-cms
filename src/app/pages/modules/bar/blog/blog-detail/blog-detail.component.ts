import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../../../../../common/common.model';
import {NzMessageService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit, OnChanges {
  @Input()
  queryId: number;
  detail: Posting;
  list: Comment[] = [];
  loading = false;
  @Output()
  deleteSuccess = new EventEmitter<void>();

  get topList() {
    return this.list.filter(item => !item.parentId);
  }

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.queryId) {
      this.fetchData();
    }
  }

  onDelete(id: number) {
    this.http.put<Result>('bar/sys/postings/change', {
      id, isDel: 1
    }).subscribe(event => {
      if (event.code === 200) {
        this.message.success('删除成功');
        this.deleteSuccess.emit();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  onDeleteComment(id: number) {
    this.http.put<Result>('bar/sys/postingscomment/delete', {
      id, isDel: 1
    }).subscribe(event => {
      if (event.code === 200) {
        this.message.success('删除成功');
        this.fetchData();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  fetchData() {
    this.loading = true;
    this.http.get<{
      code, data: {
        comments: Comment[],
        postings: Posting,
      },
      // }>(`bar/sys/postings/detail/1`).pipe(
    }>(`bar/sys/postings/detail/${this.queryId}`).pipe(
      finalize(() => this.loading = false)
    ).subscribe(event => {
      this.detail = event.data.postings;
      this.list = event.data.comments;
    });
  }

  getSubList(parentId: number) {
    return this.list.filter(item => item.parentId === parentId);
  }
}

interface Posting {
  barId: number;
  barLogo: string;
  barName: string;
  barType: number;
  context: string;
  createTime: string;
  headerImg: string;
  id: number;
  isRecommend: number;
  recommendTime: string;
  userId: number;
  username: string;
  isDel: number;
}

interface Comment {
  parentId?: number;
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
  postingsId: number;
  subCount: number;
}
