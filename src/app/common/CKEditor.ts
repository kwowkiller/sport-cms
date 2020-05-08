// https://ckeditor.com/docs/ckeditor5
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
      console.log('UploadAdapter upload called', this.loader, this.url);
      console.log('the file we got was', this.loader.file);
      resolve({default: 'https://mao.1f866.com/uploads/images/1584539236.png'});
    });
  }

  abort() {
    console.log('UploadAdapter abort');
  }
}
