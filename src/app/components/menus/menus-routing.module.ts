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
        path: 'list-deposit/:userId',
        component: ListDepositComponent,
        data: {
          title: "Deposit Lists by User",
          breadcrumb: "Deposit Lists by User"
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
        path: 'create-deposit/:bankAccountId',
        component: CreateDepositComponent,
        data: {
          title: "Create Deposit",
          breadcrumb: "Create Deposit"
        }
      },
      {
        path: 'update-deposit/:creditMovementId/:bankAccountId',
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
