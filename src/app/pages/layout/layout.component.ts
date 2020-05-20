import {Component, OnInit} from '@angular/core';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Menu} from '../../common/common.model';
import {Session} from '../../common/session';
import {filter, map} from 'rxjs/operators';
import {IndexComponent} from '../index/index.component';
import {RouteReuseService} from '../../common/route-reuse.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user = Session.user;
  isCollapsed = false;
  menus = Session.menus;
  // 打开的菜单列表
  openedMenus: Menu[] = [];

  constructor(
    private router: Router,
    private contextMenuService: NzContextMenuService,
    private route: ActivatedRoute,
  ) {
  }

  private findMenuByPath(): Menu {
    let find: Menu = null;
    const foo = (arr: Menu[]) => {
      arr.forEach(item => {
        if (item.children) {
          foo(item.children);
          return;
        }
        if (location.pathname === `/main/${item.path}`) {
          find = item;
          return false;
        }
      });
    };
    foo(this.menus);
    return find;
  }

  ngOnInit(): void {
    // 刷新页面时根据当前路径添加菜单
    const findMenu = this.findMenuByPath();
    if (findMenu) {
      this.openedMenus.push(findMenu);
    }
    // 路由事件
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      // 过滤掉首页
      filter(route => route.outlet === 'primary' && route.component !== IndexComponent),
    ).subscribe(() => {
      const menu = this.findMenuByPath();
      if (menu) {
        if (this.openedMenus.some(item => item === menu)) {
          // 已经在打开列表中
        } else {
          // 否则新增
          this.openedMenus.push(menu);
        }
      } else {
        // 没有找到对应菜单
        console.warn('该路径没有匹配的菜单');
      }
    });
  }

  // 右键菜单
  openDropdownMenu($event: MouseEvent, menu: NzDropdownMenuComponent) {
    this.contextMenuService.create($event, menu);
  }

  // 关闭页面
  closePage(menu: Menu) {
    // 如果清空 回到首页
    if (this.openedMenus.length === 1) {
      this.openedMenus = [];
      this.router.navigateByUrl('/').then();
      return;
    }
    const index = this.openedMenus.findIndex(p => p.path === menu.path);
    // 从数组删除菜单
    this.openedMenus.splice(index, 1);
    // 关闭的是当前页 跳转到标签最后一个
    if (`/main/${menu.path}` === this.router.url) {
      this.router.navigateByUrl('/main/' + this.openedMenus[this.openedMenus.length - 1].path).then(() => {
        RouteReuseService.handlers.delete(location.pathname);
      });
    }
  }

  // 关闭全部页面
  closeAllPage() {
    this.router.navigateByUrl('/main').then(() => {
      RouteReuseService.handlers.clear();
      this.openedMenus = [];
    });
  }

  // 关闭其他页面
  closeOtherPage(menu: Menu) {
    this.router.navigateByUrl('/main/' + menu.path).then(() => {
      this.openedMenus = [menu];
    });
  }

  logout() {
    sessionStorage.clear();
    window.location.href = '/login';
  }
}
