// 登录用户
export interface User {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: [];
  avatar: string;
  credentialsNonExpired: boolean;
  description: string;
  email: string;
  enabled: boolean;
  lastLoginTime: string;
  mobile: string;
  roleId: number;
  roleName: string;
  ssex: number;
  status: number;
  userId: number;
  username: string;
}

// 菜单项
export interface Menu {
  alwaysShow: boolean;
  children?: Menu[];
  component: string;
  hidden: boolean;
  meta: {
    title: string,
    icon: string,
    breadcrumb: boolean;
  };
  name: string;
  path: string;
  // 层级  用来写padding样式
  level?: number;
}
