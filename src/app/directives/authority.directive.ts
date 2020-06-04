import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';

// 判断是否有对应权限以显示元素
@Directive({
  selector: '[appAuthority]'
})
export class AuthorityDirective implements OnInit {
  @Input('appAuthority')
  authority: string;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<object>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.container.createEmbeddedView(this.template);
  }
}
