import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {EMPTY, Observable, throwError, TimeoutError} from 'rxjs';
import {catchError, filter, map, timeout} from 'rxjs/operators';
import {Session} from '../common/session';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class CoreHttp implements HttpInterceptor {
  private baseUrl = environment.baseUrl;

  constructor(
    private message: NzMessageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers: any = {};
    if (req.method === 'POST' || req.method === 'PUT') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      req = req.clone({
        body: new HttpParams({
          fromObject: req.body,
        })
      });
    }
    // 带上额外信息
    headers.authorization = Session.token;
    return next.handle(req.clone({
      // 拼接请求地址
      url: req.url.startsWith('http') ? req.url : this.baseUrl + req.url,
      // 额外请求头
      setHeaders: headers,
    })).pipe(
      timeout(20000), // 设置超时
      filter<HttpResponse<any>>(event => event.type === HttpEventType.Response),
      map((event) => {
        return event;
      }),
      catchError((event: any): Observable<any> => {
        if (event instanceof TimeoutError) {
          this.message.warning('连接超时');
          return EMPTY;
        } else if (event instanceof HttpErrorResponse) {
          switch (event.status) {
            case 400:
              // this.message.warning(`参数不正确，检查参数`);
              this.message.warning(`请求失败`);
              break;
            case 401:
              window.sessionStorage.clear();
              this.message.warning(`认证失败，请尝试重新登录`);
              break;
            case 404:
              this.message.warning(`接口${req.url}不存在`);
              break;
            case 405:
              this.message.warning(`${req.url}接口不支持${req.method}`);
              break;
            case 500:
              this.message.error((event.error as { code, message }).message);
              // this.message.error('服务器异常');
              break;
            default:
              this.message.warning(`连接服务器失败`);
          }
          return EMPTY;
        } else {
          // 继续抛异常
          return throwError(event);
        }
      })
    );
  }
}
