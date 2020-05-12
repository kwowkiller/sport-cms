import {Component, OnInit} from '@angular/core';
import {Table} from '../../../../frame/table';
import {Word} from '../other.module';
import {HttpClient} from '@angular/common/http';
import {NzMessageService, UploadChangeParam} from 'ng-zorro-antd';
import {environment} from '../../../../../environments/environment';
import {Session} from '../../../../common/session';
import {from} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-word-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent extends Table<Word> implements OnInit {

  constructor(
    protected http: HttpClient,
    protected message: NzMessageService,
  ) {
    super(http, message);
    this.listUrl = 'app/sys/words/list';
    this.deleteMethod = 'PUT';
  }

  ngOnInit(): void {
    this.fetchList('all');
  }

  beforeSearch() {
  }

  onSubmitSuccess() {
    this.message.success('保存成功');
    this.fetchList('all');
  }

  onDelete() {
    this.deleteUrl = `app/sys/words/change/${Array.from(this.setOfCheckedId.values()).join(',')}`;
    this.deleteItem();
  }

  onDeleteSingle(id: number) {
    this.deleteUrl = `app/sys/words/change/${id}`;
    this.deleteItem();
  }

  downloadExcel() {
    this.http.get<{ code, data }>('app/sys/words/excel').subscribe(event => {
      window.open(event.data);
    });
  }

  uploadExcel($event: Event) {
    const id = this.message.loading('导入中').messageId;
    const formData = new FormData();
    formData.append('file', ($event.target as any).files[0]);
    from(fetch(`${environment.baseUrl}app/sys/words/excel`, {
      method: 'POST',
      headers: {
        authorization: Session.token,
      },
      body: formData,
    })).pipe(
      finalize(() => this.message.remove(id)),
    ).subscribe(event => {
      event.json().then(json => {
        if (json.code === 200) {
          this.message.success('导入成功');
          this.fetchList('all');
        } else {
          this.message.error('导入失败');
        }
      });
    });
  }
}
