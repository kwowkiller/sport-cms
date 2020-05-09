import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {News, NewsType} from '../news.module';
import {FormBuilder, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import {CKEditor5} from '@ckeditor/ckeditor5-angular/ckeditor';
import {ModalForm} from '../../../../frame/modal-form';
import {HttpClient} from '@angular/common/http';
import {config, UploadAdapter} from '../../../../common/CKEditor';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-news-form',
  templateUrl: './modal-form.component.html',
  styles: []
})
export class ModalFormComponent extends ModalForm<News> implements OnInit, OnChanges {
  showEditor = false;
  public Editor = ClassicEditor;
  editorConfig = config;
  // 下拉框数据
  selectData: NewsType[] = [];

  get title() {
    return this.queryId ? '编辑资讯' : '创建资讯';
  }

  constructor(
    private fb: FormBuilder,
    protected http: HttpClient,
  ) {
    super(http);
    this.submitUrl = 'news/sys/news/add';
    this.form = this.fb.group({
      newsTitle: [null, [Validators.required]],
      author: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
      newsImg: [null, [Validators.required]],
      content: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.http.get<{ code: number, data: NewsType[] }>('news/sys/news/type').subscribe(event => {
      this.selectData = event.data;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const idChange = changes.queryId;
    if (this.queryId == null) {
      this.method = 'POST';
      this.submitUrl = 'news/sys/news/add';
      this.form.removeControl('id');
      this.form.reset();
    }
    if (
      idChange
      && !idChange.firstChange
      && idChange.currentValue != null
      && idChange.currentValue !== idChange.previousValue
    ) {
      this.submitUrl = 'news/sys/news/update';
      this.method = 'PUT';
      this.loading = true;
      this.http.get<{
        code, data: {
          news: News
        }
      }>(`news/sys/news/${this.queryId}`).pipe(
        finalize(() => this.loading = false)
      ).subscribe(event => {
        this.form.addControl('id', this.fb.control(null));
        this.form.setValue({
          id: event.data.news.id,
          newsTitle: event.data.news.newsTitle,
          author: event.data.news.author,
          typeId: event.data.news.typeId,
          newsImg: event.data.news.newsImg,
          content: event.data.news.content,
        });
      });
    }
  }

  beforeSubmit() {
  }

  editorReady(editor: CKEditor5.Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      return new UploadAdapter(loader, editor.config.get('uploadUrl'));
    };
  }
}

