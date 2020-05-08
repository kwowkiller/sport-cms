import {Menu, User} from './common.model';

export class Session {
  constructor() {
  }

  static get token(): string {
    // if (!sessionStorage.getItem('token')) {
    //   return 'Basic c3NsOjEyMzRxd2Vy';
    // }
    // return sessionStorage.getItem('token');
    // 测试token
    return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODg5ODk4NzQsInVzZXJfbmFtZSI6InNzbCIsImp0aSI6IjU2NzFkYTM1LWQ3ZTQtNGY1ZC1iYWE0LTNhYzJhMTk0OWUyYiIsImNsaWVudF9pZCI6InN3YWdnZXIiLCJzY29wZSI6WyJ0ZXN0Il19.lvbdpGDHnIxS6ilf4LtQ-2tnz5-9WhIy5SJRz_ThuGI';
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
