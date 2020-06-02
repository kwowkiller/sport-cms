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
      const flatArr: UIMenu[] = [];
      // 展开菜单
      const foo = (arr: UIMenu[]): void => {
        arr.forEach(item => {
          flatArr.push(item);
          if (item.children) {
            foo(item.children);
          }
        });
      };
      foo(this.menus);
      flatArr.forEach(item => {
        if (item.path.startsWith(location.pathname.split('/')[2])) {
          item.open = true;
        }
      });
    }
  }
}
