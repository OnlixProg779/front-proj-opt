import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavService } from './service/nav.service';
import { WINDOW_PROVIDERS } from './service/windows.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { ButtonViewComponent } from './button-view/button-view.component';
import { InputImgComponent } from './utils/input-img/input-img.component';
import { CheckBoxViewComponent } from './utils/check-box-view/check-box-view.component';


import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchListComponent } from './utils/search-list/search-list.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModalViewComponent } from './button-modal-view/button-modal-view.component';
import { AutoFocusInvalidInputDirective } from './directives/auto-focus-invalid-input.directive';
import { ButtonsModalRoutesComponent } from './buttons-modal-routes/buttons-modal-routes.component';
import { FormSearchFilterComponent } from './utils/form-search-filter/form-search-filter.component';
import { FormClientComponent } from './utils/form-client/form-client.component';
import { CreateClientComponent } from './utils/create-client/create-client.component';
import { ListClientComponent } from './utils/list-client/list-client.component';
import { MultiSelComponent } from './multi-sel/multi-sel.component';
import { CardBankAccountComponent } from './card-bank-account/card-bank-account.component';
import { ListImportedCreditMovementsComponent } from './list-imported-credit-movements/list-imported-credit-movements.component';
import { ListImportedDebitMovementsComponent } from './list-imported-debit-movements/list-imported-debit-movements.component';
import { ScannerQrBarcodeComponent } from './utils/scanner-qr-barcode/scanner-qr-barcode.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CountToModule } from 'angular-count-to';


@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    FeatherIconsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
    ButtonViewComponent,
    InputImgComponent,
    CheckBoxViewComponent,
    SearchListComponent,
    ButtonModalViewComponent,
    AutoFocusInvalidInputDirective,
    ButtonsModalRoutesComponent,
    FormSearchFilterComponent,
    FormClientComponent,
    CreateClientComponent,
    ListClientComponent,
    MultiSelComponent,
    CardBankAccountComponent,
    ListImportedCreditMovementsComponent,
    ListImportedDebitMovementsComponent,
    ScannerQrBarcodeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LazyLoadImageModule,
    FormsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgxDatatableModule,
    NgbModule,
    ZXingScannerModule,
    CountToModule,

    
  ],
  providers: [NavService, WINDOW_PROVIDERS],
  exports: [
    FeatherIconsComponent, 
    ToggleFullscreenDirective,
    InputImgComponent,
    LazyLoadImageModule,
    SearchListComponent,
    AutoFocusInvalidInputDirective,
    ButtonsModalRoutesComponent,
    FormSearchFilterComponent,
    FormClientComponent,
    CreateClientComponent,
    ListClientComponent,
    MultiSelComponent,
    CardBankAccountComponent,
    ListImportedCreditMovementsComponent,
    ListImportedDebitMovementsComponent,
    ScannerQrBarcodeComponent,
  ]
})
export class SharedModule { }
