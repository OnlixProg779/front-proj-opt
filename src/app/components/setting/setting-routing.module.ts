import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenListsComponent } from './gen-lists/gen-lists.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: "Profile",
      breadcrumb: "Profile"
    }
  },
  {
    path: 'menus',
    component: GenListsComponent,
    data: {
      title: "Menus",
      breadcrumb: "Menus"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
