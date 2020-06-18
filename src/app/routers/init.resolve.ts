import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UIMenu, User} from '../common/common.model';
import {Session} from '../common/session';
import {NzMessageService} from 'ng-zorro-antd';
import {Menu} from '../pages/modules/system/system.module';
import {PermissionService} from '../services/permission.service';
import {environment} from '../../environments/environment';

/**
 * 获取用户信息 权限 菜单等
 */
@Injectable()
export class InitResolve implements Resolve<any> {
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private permissionService: PermissionService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let messageId: string = null;
    // 登录信息
    if (!Session.user) {
      messageId = this.message.loading('加载用户信息').messageId;
      const loginInfo = await this.http.get<{
        principal: User,
      }>('auth/user').toPromise();
      Session.user = loginInfo.principal;
    }
    // 获取按钮权限
    await this.permissionService.fetchMenus();
    await this.permissionService.fetchButtons();
    // 菜单信息
    if (!Session.menus) {
      const menuData = await this.http.get<{
        code: number,
        data: {
          permissions: string[],
          routes: UIMenu[]
        },
      }>(`admin/system/menu/${Session.user.username}`).toPromise();
      const foo = (arr: UIMenu[], level: number): UIMenu[] => {
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
      if (messageId != null) {
        this.message.remove(messageId);
      }
      if (environment.production) {
        Session.menus = foo(menuData.data.routes.filter(i => i.path !== '*'), 0);
      } else {
        // 测试数据
        const temp: UIMenu[] = [
          {
            id: 101,
            alwaysShow: true,
            children: [
              {
                id: 2,
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
                id: 3,
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
              {
                id: 300,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '等级配置',
                  icon: '',
                  breadcrumb: false,
                },
                name: '等级配置',
                path: 'user/level',
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
            id: 4,
            alwaysShow: true,
            children: [
              {
                id: 5,
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
              {
                id: 40,
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
              },
              {
                id: 301,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '弹幕管理',
                  icon: '',
                  breadcrumb: false,
                },
                name: '弹幕管理',
                path: 'live/bullet',
              },
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
            id: 303,
            alwaysShow: true,
            children: [
              {
                id: 304,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '礼物管理',
                  icon: '',
                  breadcrumb: false,
                },
                name: '礼物管理',
                path: 'gift',
              },
              {
                id: 305,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '积分充值',
                  icon: '',
                  breadcrumb: false,
                },
                name: '积分充值',
                path: 'gift/point',
              },
            ],
            component: '',
            hidden: false,
            meta: {
              title: '礼物管理',
              icon: 'gift',
              breadcrumb: false,
            },
            name: '礼物管理',
            path: 'gift',
          },
          {
            id: 30,
            alwaysShow: true,
            children: [
              {
                id: 31,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '主播审核',
                  icon: '',
                  breadcrumb: false,
                },
                name: '主播审核',
                path: 'anchor/list1',
              },
              {
                id: 32,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '主播列表',
                  icon: '',
                  breadcrumb: false,
                },
                name: '主播列表',
                path: 'anchor/list2',
              },
            ],
            component: '',
            hidden: false,
            meta: {
              title: '主播管理',
              icon: 'audio',
              breadcrumb: false,
            },
            name: '主播管理',
            path: 'anchor',
          },
          {
            id: 23,
            alwaysShow: true,
            children: [
              {
                id: 6,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '足球赛事',
                  icon: '',
                  breadcrumb: false,
                },
                name: '足球赛事',
                path: 'match/football',
              },
              {
                id: 310,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '篮球赛事',
                  icon: '',
                  breadcrumb: false,
                },
                name: '篮球赛事',
                path: 'match/basketball',
              },
            ],
            component: '',
            hidden: false,
            meta: {
              title: '赛事管理',
              icon: 'trophy',
              breadcrumb: false,
            },
            name: '赛事管理',
            path: 'match',
          },
          {
            id: 330,
            alwaysShow: true,
            children: [
              {
                id: 331,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '方案审核',
                  icon: '',
                  breadcrumb: false,
                },
                name: '方案审核',
                path: 'scheme/audit',
              },
              {
                id: 332,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '方案列表',
                  icon: '',
                  breadcrumb: false,
                },
                name: '方案列表',
                path: 'scheme/list',
              },
              {
                id: 333,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '方案用户管理',
                  icon: '',
                  breadcrumb: false,
                },
                name: '方案用户管理',
                path: 'scheme/user',
              },
            ],
            component: '',
            hidden: false,
            meta: {
              title: '方案管理',
              icon: 'unordered-list',
              breadcrumb: false,
            },
            name: '方案管理',
            path: 'scheme',
          },
          {
            id: 22,
            alwaysShow: true,
            children: [
              {
                id: 7,
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
                id: 8,
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
            id: 21,
            alwaysShow: true,
            children: [
              {
                id: 9,
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
              {
                id: 44,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '资讯分类',
                  icon: '',
                  breadcrumb: false,
                },
                name: '资讯分类',
                path: 'news/category',
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
            id: 20,
            alwaysShow: true,
            children: [
              {
                id: 10,
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
            id: 11,
            alwaysShow: true,
            children: [
              {
                id: 12,
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
            id: 13,
            alwaysShow: true,
            children: [
              {
                id: 55,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '标签管理',
                  icon: '',
                  breadcrumb: false,
                },
                name: '标签管理',
                path: 'other/tags',
              },
              {
                id: 14,
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
                id: 15,
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
            id: 400,
            alwaysShow: true,
            children: [
              {
                id: 401,
                alwaysShow: true,
                component: '',
                hidden: false,
                meta: {
                  title: '任务管理',
                  icon: '',
                  breadcrumb: false,
                },
                name: '任务管理',
                path: 'task',
              },
            ],
            component: '',
            hidden: false,
            meta: {
              title: '任务管理',
              icon: 'database',
              breadcrumb: false,
            },
            name: '任务管理',
            path: 'task',
          },
          {
            id: 1,
            alwaysShow: true,
            children: [
              {
                id: 17,
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
                id: 18,
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
                id: 19,
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
        // Session.menus = foo(menuData.data.routes.filter(i => i.path !== '*'), 0);
      }
    }
  }
}
