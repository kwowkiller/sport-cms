import {Component, OnInit} from '@angular/core';
import {UploadFile} from 'ng-zorro-antd';
import {from, Observable, Observer, Subscription} from 'rxjs';
import {UploadXHRArgs} from 'ng-zorro-antd/upload/interface';
import {environment} from '../../../environments/environment';
import {Session} from '../../common/session';
import {finalize} from 'rxjs/operators';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CustomInput} from '../../frame/custom-input';

@Component({
  selector: 'app-upload',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadComponent,
      multi: true
    },
  ],
  template: `
    <nz-upload
      nzName="avatar"
      nzListType="picture-card"
      [nzShowUploadList]="false"
      [nzBeforeUpload]="beforeUpload"
      [nzCustomRequest]="customRequest"
    >
      <ng-container *ngIf="!model">
        <i class="upload-icon" nz-icon [nzType]="uploading ? 'loading' : 'plus'"></i>
        <div class="ant-upload-text">点击选择图片</div>
      </ng-container>
      <img alt *ngIf="model" [src]="model" style="width: 100%"/>
    </nz-upload>
  `,
  styles: []
})
export class UploadComponent extends CustomInput implements OnInit {
  uploading = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  beforeUpload(file: UploadFile) {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        // this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        // this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  }

  customRequest = (item: UploadXHRArgs): Subscription => {
    this.uploading = true;
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', item.file);
    return from(fetch(`${environment.baseUrl}app/sys/app/file/upload`, {
      method: 'POST',
      headers: {
        authorization: Session.token,
      },
      body: formData,
    })).pipe(
      finalize(() => this.uploading = false)
    ).subscribe(event => {
      event.json().then(json => {
        if (json.code === 200) {
          this.onModelChange(json.data);
        }
      });
    });
  };
}
