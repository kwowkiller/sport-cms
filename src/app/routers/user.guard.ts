import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Session} from '../common/session';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor() {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (Session.token.startsWith('Basic')) {
      window.location.href = '/login';
      return false;
    }
    return true;
  }
}
