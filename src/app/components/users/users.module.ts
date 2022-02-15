import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersRoutingModule } from './users-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UpdateClientComponent } from './update-client/update-client.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { CountToModule } from 'angular-count-to';

import { MenusModule } from '../menus/menus.module';



// MATERIAL


@NgModule({
  declarations: [

    UpdateClientComponent,  
    ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    CountToModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MenusModule,
 // MATERIAL

  ],
  exports: []

})
export class UsersModule { }
