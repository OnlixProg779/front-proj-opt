import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormUserComponent } from './form-user/form-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [LoginComponent, CreateUserComponent, FormUserComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AuthModule { }
