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
      // 测试数据
      const temp: Menu[] = [
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '用户管理',
                icon: '',
                breadcrumb: false,
              },
              name: '用户管理',
              path: 'user',
            },
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '认证管理',
                icon: '',
                breadcrumb: false,
              },
              name: '认证管理',
              path: 'user/auth',
            },
          ],
          component: '',
          hidden: false,
          meta: {
            title: '用户管理',
            icon: 'usergroup-delete',
            breadcrumb: false,
          },
          name: '用户管理',
          path: 'user',
        },
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: 'TV管理',
                icon: '',
                breadcrumb: false,
              },
              name: 'TV管理',
              path: 'live/tv',
            },
            /*{
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '直播管理',
                icon: '',
                breadcrumb: false,
              },
              name: '直播管理',
              path: 'live/live',
            },*/
          ],
          component: '',
          hidden: false,
          meta: {
            title: '直播管理',
            icon: 'video-camera-add',
            breadcrumb: false,
          },
          name: '直播管理',
          path: 'live',
        },
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '赛事管理',
                icon: '',
                breadcrumb: false,
              },
              name: '赛事管理',
              path: 'match',
            },
          ],
          component: '',
          hidden: false,
          meta: {
            title: '赛事管理',
            icon: 'unordered-list',
            breadcrumb: false,
          },
          name: '赛事管理',
          path: 'match',
        },
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '球吧管理',
                icon: '',
                breadcrumb: false,
              },
              name: '球吧管理',
              path: 'bar',
            },
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '贴子管理',
                icon: '',
                breadcrumb: false,
              },
              name: '贴子管理',
              path: 'bar/blog',
            },
          ],
          component: '',
          hidden: false,
          meta: {
            title: '球吧管理',
            icon: 'appstore',
            breadcrumb: false,
          },
          name: '球吧管理',
          path: 'bar',
        },
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '资讯管理',
                icon: '',
                breadcrumb: false,
              },
              name: '资讯管理',
              path: 'news',
            },
          ],
          component: '',
          hidden: false,
          meta: {
            title: '资讯管理',
            icon: 'read',
            breadcrumb: false,
          },
          name: '资讯管理',
          path: 'news',
        },
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: 'Banner管理',
                icon: '',
                breadcrumb: false,
              },
              name: 'Banner管理',
              path: 'banner',
            },
          ],
          component: '',
          hidden: false,
          meta: {
            title: 'Banner管理',
            icon: 'diff',
            breadcrumb: false,
          },
          name: 'Banner管理',
          path: 'banner',
        },
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '消息管理',
                icon: '',
                breadcrumb: false,
              },
              name: '消息管理',
              path: 'message',
            },
          ],
          component: '',
          hidden: false,
          meta: {
            title: '消息管理',
            icon: 'message',
            breadcrumb: false,
          },
          name: '消息管理',
          path: 'message',
        },
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '敏感词管理',
                icon: '',
                breadcrumb: false,
              },
              name: '敏感词管理',
              path: 'other/word',
            },
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '常见问题',
                icon: '',
                breadcrumb: false,
              },
              name: '常见问题',
              path: 'other/help',
            },
          ],
          component: '',
          hidden: false,
          meta: {
            title: '公共信息管理',
            icon: 'warning',
            breadcrumb: false,
          },
          name: '公共信息管理',
          path: 'information',
        },
        {
          alwaysShow: true,
          children: [
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '用户管理',
                icon: '',
                breadcrumb: false,
              },
              name: '用户管理',
              path: 'system/admin',
            },
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '菜单管理',
                icon: '',
                breadcrumb: false,
              },
              name: '菜单管理',
              path: 'system/menu',
            },
            {
              alwaysShow: true,
              component: '',
              hidden: false,
              meta: {
                title: '角色管理',
                icon: '',
                breadcrumb: false,
              },
              name: '角色管理',
              path: 'system/role',
            },
          ],
          component: '',
          hidden: false,
          meta: {
            title: '系统管理',
            icon: 'dashboard',
            breadcrumb: false,
          },
          name: '系统管理',
          path: 'system',
        },
      ];
      Session.menus = foo(temp, 0);
    }
  }
}
