import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../../../common/session';
import {Menu} from '../../../common/common.model';

@Component({
  selector: 'app-side-menus',
  templateUrl: './side-menus.component.html',
})
export class SideMenusComponent implements OnInit {
  @Input()
  isCollapsed: boolean;
  menus = Session.menus;

  format(arr: any) {
    return arr as Menu[];
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
