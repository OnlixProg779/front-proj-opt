import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { MenusModule } from './components/menus/menus.module';
import { UsersModule } from './components/users/users.module';

import { SettingModule } from './components/setting/setting.module';;
import { AuthModule } from './components/auth/auth.module';

import { HttpInterceptorModule } from './shared/service/http-interceptor.model';

import {NgxImageCompressService} from 'ngx-image-compress';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    SettingModule,
    AuthModule,
    SharedModule,

    MenusModule,
    UsersModule,
    HttpInterceptorModule,

  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
