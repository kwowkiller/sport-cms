import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Menu, User} from '../common/common.model';
import {Session} from '../common/session';

/**
 * 获取用户信息 权限 菜单等
 */
@Injectable()
export class InitResolve implements Resolve<any> {
  constructor(private http: HttpClient) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // 登录信息
    if (!Session.user) {
      const loginInfo = await this.http.get<{
        principal: User,
      }>('auth/user').toPromise();
      Session.user = loginInfo.principal;
    }
    // 菜单信息
    if (!Session.menus) {
      const menuData = await this.http.get<{
        code: number,
        data: {
          permissions: string[],
          routes: Menu[]
        },
      }>(`admin/system/menu/${Session.user.username}`).toPromise();
      const foo = (arr: Menu[], level: number): Menu[] => {
        return arr.map(item => {
          if (item.children) {
            return {
              ...item,
              children: foo(item.children, level + 1),
              level,
            };
          }
          return {
            ...item,
            level
          };
        });
      };
      Session.menus = foo(menuData.data.routes, 0);
    }
  }
}
