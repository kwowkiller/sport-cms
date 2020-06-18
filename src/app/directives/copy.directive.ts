import {Directive, HostListener, Input} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Directive({
  selector: '[appCopy]'
})
export class CopyDirective {
  @Input()
  text = '';
  @Input()
  disabled = false;

  constructor(
    private message: NzMessageService,
  ) {
  }

  @HostListener('click')
  copy() {
    if (this.disabled) {
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = this.text;
    textarea.style.width = '0';
    textarea.style.height = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    this.message.success('复制成功');
    textarea.remove();
  }
}
