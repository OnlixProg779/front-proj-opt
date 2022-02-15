import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MenusRoutingModule } from './menus-routing.module';
import { ListDepositComponent } from './list-deposit/list-deposit.component';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateDepositComponent } from './update-deposit/update-deposit.component';
import { FormsModule } from '@angular/forms';
import { CreditMovementFormComponent } from './credit-movement-form/credit-movement-form.component';
import { ListCreditMovementsGenericComponent } from './list-credit-movements-generic/list-credit-movements-generic.component';
import { UploadCreditMovementsImportedComponent } from './upload-credit-movements-imported/upload-credit-movements-imported.component';


@NgModule({
  declarations: [ListDepositComponent, 
    CreateDepositComponent,
    UpdateDepositComponent, 
    CreditMovementFormComponent, 
    ListCreditMovementsGenericComponent, 
    UploadCreditMovementsImportedComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    Ng2SmartTableModule,
    FormsModule
  ],
  exports: [
    ListDepositComponent, UpdateDepositComponent
  ]
})
export class MenusModule { }
