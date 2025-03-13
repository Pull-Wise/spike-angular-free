import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { UserRegistrationComponent } from 'src/app/components/user-registration/user-registration.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { MyProductsComponent } from 'src/app/components/my-products/my-products.component';
import { StockManagementComponent } from 'src/app/components/stock-management/stock-management.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'about',
        component: UserProfileComponent
      },
      {
        path: 'my-products',
        component: MyProductsComponent
      },
      {
        path: 'stock-management',
        component: StockManagementComponent
      }
    ],
  },
];
