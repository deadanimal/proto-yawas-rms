export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-home text-dark'
  },
  {
    path: '/admin/redemption',
    title: 'Redemption',
    type: 'link',
    icontype: 'fas fa-hand-holding-usd text-dark'
  },
  {
    path: '/admin/iventory',
    title: 'Iventory',
    type: 'sub',
    icontype: 'fas fa-file-invoice text-dark',
    collapse: 'iventory',
    isCollapsed: true,
    children: [
      { path: 'list', title: 'List', type: 'link' },
      { path: 'item-management', title: 'Item Management', type: 'link' }
    ]
  },
  {
    path: '/admin/management',
    title: 'Management',
    type: 'sub',
    icontype: 'fas fa-file-invoice text-pink',
    collapse: 'management',
    isCollapsed: true,
    children: [
      { path: 'audit-trails', title: 'Audit Trails', type: 'link' },
      { path: 'user', title: 'User', type: 'link' }
    ]
  },
  {
    path: '/admin/report',
    title: 'Reporting',
    type: 'link',
    icontype: 'fas fa-chart-bar text-red'
  },
  /*
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }
  */
];

export const ROUTESUSER: RouteInfo[] = [
  {
    path: '/user/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-dark'
  },
  {
    path: '/user/redeem',
    title: 'Redeem',
    type: 'link',
    icontype: 'fas fa-file-invoice text-dark'
  },
  // {
  //   path: '/houses',
  //   title: 'Houses',
  //   type: 'link',
  //   icontype: 'fas fa-home text-purple'
  // },
  // {
  //   path: '/management',
  //   title: 'Management',
  //   type: 'link',
  //   icontype: 'fas fa-tasks text-red'
  // },
  // {
  //   path: '/report',
  //   title: 'Report',
  //   type: 'link',
  //   icontype: 'fas fa-chart-bar text-green'
  // },
  // {
  //   path: '/helpdesk',
  //   title: 'Helpdesk',
  //   type: 'link',
  //   icontype: 'fas fa-life-ring text-blue'
  // },
  // {
  //   path: '/audit',
  //   title: 'Audit Trail',
  //   type: 'link',
  //   icontype: 'fas fa-braille text-indigo'
  // }
  /*,
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-cogs text-orange'
  }*/
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    icontype: 'fas fa-sliders-h text-blue'
  }*/
];