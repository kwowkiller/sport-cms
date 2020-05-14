export interface Pageable<T> {
  code: number;
  data: {
    current: number;
    orders: [];
    pages: number;
    // 列表数据
    records: T[];
    searchCount: boolean;
    size: number;
    // 总数
    total: number;
  };
}

export interface Result {
  code: number;
  message: string;
}

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
  id: number;
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
  // 是否展开
  open?: boolean;
}

