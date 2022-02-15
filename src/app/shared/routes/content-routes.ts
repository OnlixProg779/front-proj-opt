import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'deposits',
    loadChildren: () => import('../../components/menus/menus.module').then(m => m.MenusModule),
    data: {
      breadcrumb: "Deposits"
    }
  },
  {
    path: 'clients',
    loadChildren: () => import('../../components/users/users.module').then(m => m.UsersModule),
    data: {
      breadcrumb: "Clients"
    }
  },
  
  
  {
    path: 'settings',
    loadChildren: () => import('../../components/setting/setting.module').then(m => m.SettingModule),
    data: {
      breadcrumb: "Settings"
    }
  },
  
];