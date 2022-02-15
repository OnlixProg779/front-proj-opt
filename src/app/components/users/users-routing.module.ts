import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateClientComponent } from './update-client/update-client.component';
import { CreateClientComponent } from 'src/app/shared/utils/create-client/create-client.component';
import { ListClientComponent } from 'src/app/shared/utils/list-client/list-client.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-client',
        component: ListClientComponent,
        data: {
          title: "Client List",
          breadcrumb: "Client List"
        }
      },
      {
        path: 'create-client',
        component: CreateClientComponent,
        data: {
          title: "Create Client",
          breadcrumb: "Create Client"
        }
      },
      {
        path: 'update-client/:idClient',
        component: UpdateClientComponent,
        data: {
          title: "Update Client",
          breadcrumb: "Update Client"
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
