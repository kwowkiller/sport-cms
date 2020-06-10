import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {PermissionService} from '../services/permission.service';
import {environment} from '../../environments/environment';

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
    private permissionService: PermissionService,
  ) {
  }

  ngOnInit(): void {
    if (!environment.production) {
      this.container.createEmbeddedView(this.template);
      return;
    }
    if (this.permissionService.getCurrentMenuButtons().some(i => i.path === this.authority)) {
      this.container.createEmbeddedView(this.template);
    }
  }
}
