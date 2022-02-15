import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepositComponent } from './list-deposit/list-deposit.component';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';
import { UpdateDepositComponent } from './update-deposit/update-deposit.component';
import { UploadCreditMovementsImportedComponent } from './upload-credit-movements-imported/upload-credit-movements-imported.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-deposit',
        component: ListDepositComponent,
        data: {
          title: "Deposit Lists",
          breadcrumb: "Deposit Lists"
        }
      },
      {
        path: 'list-deposit/:clientId',
        component: ListDepositComponent,
        data: {
          title: "Deposit Lists by Client",
          breadcrumb: "Deposit Lists by Client"
        }
      },
      {
        path: 'create-deposit',
        component: CreateDepositComponent,
        data: {
          title: "Create Deposit",
          breadcrumb: "Create Deposit"
        }
      },
      {
        path: 'upload-credmov-import',
        component: UploadCreditMovementsImportedComponent,
        data: {
          title: "Credit Movements Imported",
          breadcrumb: "Credit Movements Imported"
        }
      },
      {
        path: 'create-deposit/:clientId',
        component: CreateDepositComponent,
        data: {
          title: "Create Client Deposit",
          breadcrumb: "Create Client Deposit"
        }
      },
      {
        path: 'update-deposit/:creditMovementId/:clientId',
        component: UpdateDepositComponent,
        data: {
          title: "Update Deposit",
          breadcrumb: "Update Deposit"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
