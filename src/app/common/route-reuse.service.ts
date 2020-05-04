import {ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy} from '@angular/router';

// 保存路由状态 缓存并复用路由
export class RouteReuseService implements RouteReuseStrategy {

  static handlers: Map<Route, DetachedRouteHandle> = new Map();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !route.firstChild && route.data.reuse;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return RouteReuseService.handlers.has(route.routeConfig) && route.data.reuse;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
    return curr.routeConfig === future.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!!route.firstChild) {
      return null;
    }
    return RouteReuseService.handlers.get(route.routeConfig);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    RouteReuseService.handlers.set(route.routeConfig, handle);
  }

}
