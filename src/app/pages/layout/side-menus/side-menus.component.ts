import {Component, Input, OnInit} from '@angular/core';
import {UIMenu} from '../../../common/common.model';

@Component({
  selector: 'app-side-menus',
  templateUrl: './side-menus.component.html',
})
export class SideMenusComponent implements OnInit {
  @Input()
  isCollapsed: boolean;
  @Input()
  menus: UIMenu[];

  format(arr: any) {
    return arr as UIMenu[];
  }

  constructor() {
  }

  ngOnInit(): void {
    if (location.pathname !== '/main') {
      // 展开菜单
      const foo = (arr: UIMenu[], parent: UIMenu = null): void => {
        arr.forEach(item => {
          if (item.path && item.path.startsWith(location.pathname.split('/')[2])) {
            parent.open = true;
            item.open = true;
          }
          if (item.children) {
            foo(item.children, item);
          }
        });
      };
      foo(this.menus);
    }
  }
}
