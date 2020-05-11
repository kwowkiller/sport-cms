import {Menu, User} from './common.model';
import {environment} from '../../environments/environment';

export class Session {
  constructor() {
  }

  static get token(): string {
    if (!sessionStorage.getItem('token')) {
      return 'Basic c3NsOjEyMzRxd2Vy';
    }
    return sessionStorage.getItem('token');
  }

  static set token(token) {
    sessionStorage.setItem('token', token);
  }

  static set user(user) {
    if (user == null) {
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  static get user(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  static set menus(menus) {
    sessionStorage.setItem('menus', JSON.stringify(menus));
  }

  static get menus(): Menu[] {
    return JSON.parse(sessionStorage.getItem('menus'));
  }
}
