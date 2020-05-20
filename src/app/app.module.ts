import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {InitService} from './common/init.service';
import {CoreHttp} from './interceptors/core.http';
import {RouteReuseService} from './common/route-reuse.service';
import {LoginComponent} from './pages/login/login.component';
import {
  NzAvatarModule,
  NzButtonModule, NzDropDownModule,
  NzFormModule, NzIconModule,
  NzInputModule, NzLayoutModule,
  NzMessageModule,
} from 'ng-zorro-antd';
import {LayoutComponent} from './pages/layout/layout.component';
import {InitResolve} from './routers/init.resolve';
import {ErrorHandler as MyErrorHandler} from './common/error-handler';
import {SideMenusComponent} from './pages/layout/side-menus/side-menus.component';
import {UserGuard} from './routers/user.guard';
import {VideoComponent} from './pages/video.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SideMenusComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    NzLayoutModule,
    NzAvatarModule,
    NzDropDownModule,
    NzIconModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'main'},
      {
        path: 'main',
        component: LayoutComponent,
        resolve: {menus: InitResolve},
        loadChildren: () => import('./pages/modules/main.module').then(m => m.MainModule),
        canActivate: [UserGuard],
      },
      {path: 'login', component: LoginComponent},
      {path: 'video', component: VideoComponent},
    ]),
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: RouteReuseService}, // 路由缓存，复用路由
    {provide: ErrorHandler, useClass: MyErrorHandler},
    {
      provide: APP_INITIALIZER,
      useFactory: (initializer: InitService) => () => initializer.init(),
      multi: true,
      deps: [InitService]
    },
    InitResolve,
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: HTTP_INTERCEPTORS, useClass: CoreHttp, multi: true},
    {provide: RouteReuseStrategy, useClass: RouteReuseService}, // 路由缓存，复用路由
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
