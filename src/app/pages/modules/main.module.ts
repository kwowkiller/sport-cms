import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {IndexComponent} from '../index/index.component';
import {NotFoundComponent} from '../errors/not-found.component';

@NgModule({
  declarations: [
    IndexComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent,
      },
      {
        // 系统管理
        path: 'system',
        loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
      },
      {
        // 球吧管理
        path: 'bar',
        loadChildren: () => import('./bar/bar.module').then(m => m.BarModule),
      },
      {
        // 直播管理
        path: 'live',
        loadChildren: () => import('./live/live.module').then(m => m.LiveModule),
      },
      {
        // 赛事管理
        path: 'match',
        loadChildren: () => import('./match/match.module').then(m => m.MatchModule),
      },
      {
        // 咨询管理
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
      },
      {
        // 用户管理
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      // 404
      {path: '**', component: NotFoundComponent},
    ]),
  ]
})
export class MainModule {
}
