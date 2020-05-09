// https://ckeditor.com/docs/ckeditor5
import {environment} from '../../environments/environment';
import {Session} from './session';

export const config = {
  language: 'zh-cn',
  image: {
    toolbar: [
      'imageTextAlternative',
      '|',
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      'imageStyle:full',
    ],
    styles: [
      'full',
      'alignLeft',
      'alignRight',
      'alignCenter'
    ]
  }
};

export class UploadAdapter {
  loader;  // your adapter communicates to CKEditor through this
  url;

  constructor(loader, url) {
    this.loader = loader;
    this.url = url;
    console.log('Upload Adapter Constructor', this.loader, this.url);
  }

  upload() {
    return new Promise((resolve, reject) => {
      // console.log('UploadAdapter upload called', this.loader, this.url);
      // console.log('the file we got was', this.loader.file);
      const formData = new FormData();
      formData.append('file', this.loader.file);
      fetch(`${environment.baseUrl}app/sys/app/file/upload`, {
        method: 'POST',
        headers: {
          authorization: Session.token,
        },
        body: formData,
      }).then(response => {
        response.json().then(json => {
          resolve({default: json.data});
        });
      });
    });
  }

  abort() {
    console.log('UploadAdapter abort');
  }
}
