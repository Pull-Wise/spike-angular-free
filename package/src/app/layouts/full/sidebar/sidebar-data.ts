import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Seller',
  },
  {
    displayName: 'My products',
    iconName: 'shopping-cart',
    bgcolor: 'accent',
    route: '/ui-components/my-products',
  },
  {
    displayName: 'Stock Management',
    iconName: 'stack-3',
    bgcolor: 'accent',
    route: '/ui-components/stock-management',
  },
  // {
  //   displayName: 'Badge',
  //   iconName: 'rosette',
  //   bgcolor: 'accent',
  //   route: '/ui-components/badge',
  // },
  // {
  //   displayName: 'Chips',
  //   iconName: 'poker-chip',
  //   bgcolor: 'warning',
  //   route: '/ui-components/chips',
  // },
  // {
  //   displayName: 'Lists',
  //   iconName: 'list',
  //   bgcolor: 'success',
  //   route: '/ui-components/lists',
  // },
  // {
  //   displayName: 'Menu',
  //   iconName: 'layout-navbar-expand',
  //   bgcolor: 'error',
  //   route: '/ui-components/menu',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'tooltip',
  //   bgcolor: 'primary',
  //   route: '/ui-components/tooltips',
  // },
  {
    navCap: 'Profile',
  },
  {
    displayName: 'My Profile',
    iconName: 'user-circle',
    bgcolor: 'primary',
    route: '/ui-components/about',
  },
  // {
  //   displayName: 'Login',
  //   iconName: 'lock',
  //   bgcolor: 'accent',
  //   route: '/authentication/login',
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   bgcolor: 'warning',
  //   route: '/authentication/register',
  // },
  // {
  //   navCap: 'Extra',
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'mood-smile',
  //   bgcolor: 'success',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   bgcolor: 'error',
  //   route: '/extra/sample-page',
  // },
];
