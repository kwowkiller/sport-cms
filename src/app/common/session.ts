import {Menu, User} from './common.model';
import {environment} from '../../environments/environment';

export class Session {
  constructor() {
  }

  static get token(): string {
    if (environment.production) {
      if (!sessionStorage.getItem('token')) {
        return 'Basic c3NsOjEyMzRxd2Vy';
      }
      return sessionStorage.getItem('token');
    } else {
      // 测试token
      return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODkwNzYzMzgsInVzZXJfbmFtZSI6InNzbCIsImp0aSI6IjYyZDZiYzM0LWZjNTYtNGQ1NC1hMzgwLTk5YTgwZjdjOGVkYiIsImNsaWVudF9pZCI6InN3YWdnZXIiLCJzY29wZSI6WyJ0ZXN0Il19.i_VdVvhqLVYbyCnvY2uqgmyJ8dSWpFf3sK3KJ0c_9LY';
    }
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
