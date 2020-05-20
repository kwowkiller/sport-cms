import {ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy} from '@angular/router';

// 保存路由状态 缓存并复用路由
export class RouteReuseService implements RouteReuseStrategy {

  static handlers: Map<string, DetachedRouteHandle> = new Map();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !route.firstChild;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return RouteReuseService.handlers.has(this.getFullPath(route));
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
    return curr.routeConfig === future.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!!route.firstChild || !RouteReuseService.handlers.has(this.getFullPath(route))) {
      return null;
    }
    return RouteReuseService.handlers.get(this.getFullPath(route));
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    RouteReuseService.handlers.set(this.getFullPath(route), handle);
  }

  getFullPath(route: ActivatedRouteSnapshot) {
    // tslint:disable
    return route['_routerState'].url;
  }
}
