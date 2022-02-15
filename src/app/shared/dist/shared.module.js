"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var feather_icons_component_1 = require("./components/feather-icons/feather-icons.component");
var footer_component_1 = require("./components/footer/footer.component");
var header_component_1 = require("./components/header/header.component");
var sidebar_component_1 = require("./components/sidebar/sidebar.component");
var fullscreen_directive_1 = require("./directives/fullscreen.directive");
var content_layout_component_1 = require("./layout/content-layout/content-layout.component");
var nav_service_1 = require("./service/nav.service");
var windows_service_1 = require("./service/windows.service");
var breadcrumb_component_1 = require("./components/breadcrumb/breadcrumb.component");
var right_sidebar_component_1 = require("./components/right-sidebar/right-sidebar.component");
var button_view_component_1 = require("./button-view/button-view.component");
var input_img_component_1 = require("./utils/input-img/input-img.component");
var check_box_view_component_1 = require("./utils/check-box-view/check-box-view.component");
var related_product_component_1 = require("./utils/related-product/related-product.component");
var product_box_one_component_1 = require("./utils/product-box-one/product-box-one.component");
var ng_lazyload_image_1 = require("ng-lazyload-image");
var search_list_component_1 = require("./utils/search-list/search-list.component");
var ng2_smart_table_1 = require("ng2-smart-table");
var forms_1 = require("@angular/forms");
var ng_select2_1 = require("ng-select2");
var template_address_component_1 = require("./utils/template-address/template-address.component");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var button_modal_view_component_1 = require("./button-modal-view/button-modal-view.component");
var template_order_view_component_1 = require("./components/template-order-view/template-order-view.component");
var template_shipping_view_component_1 = require("./components/template-shipping-view/template-shipping-view.component");
var auto_focus_invalid_input_directive_1 = require("./directives/auto-focus-invalid-input.directive");
var buttons_modal_routes_component_1 = require("./buttons-modal-routes/buttons-modal-routes.component");
var products_list_any_component_1 = require("./utils/products-list-any/products-list-any.component");
var form_search_filter_component_1 = require("./utils/form-search-filter/form-search-filter.component");
var card_products_component_1 = require("./utils/card-products/card-products.component");
var form_address_client_component_1 = require("./utils/form-address-client/form-address-client.component");
var form_client_component_1 = require("./utils/form-client/form-client.component");
var create_client_component_1 = require("./utils/create-client/create-client.component");
var template_guide_view_component_1 = require("./components/template-guide-view/template-guide-view.component");
var list_client_component_1 = require("./utils/list-client/list-client.component");
var multi_sel_component_1 = require("./multi-sel/multi-sel.component");
var card_bank_account_component_1 = require("./card-bank-account/card-bank-account.component");
var list_imported_credit_movements_component_1 = require("./list-imported-credit-movements/list-imported-credit-movements.component");
var list_imported_debit_movements_component_1 = require("./list-imported-debit-movements/list-imported-debit-movements.component");
var scanner_qr_barcode_component_1 = require("./utils/scanner-qr-barcode/scanner-qr-barcode.component");
var ngx_scanner_1 = require("@zxing/ngx-scanner");
var template_purchase_view_component_1 = require("./components/template-purchase-view/template-purchase-view.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                fullscreen_directive_1.ToggleFullscreenDirective,
                feather_icons_component_1.FeatherIconsComponent,
                footer_component_1.FooterComponent,
                header_component_1.HeaderComponent,
                sidebar_component_1.SidebarComponent,
                content_layout_component_1.ContentLayoutComponent,
                breadcrumb_component_1.BreadcrumbComponent,
                right_sidebar_component_1.RightSidebarComponent,
                button_view_component_1.ButtonViewComponent,
                input_img_component_1.InputImgComponent,
                check_box_view_component_1.CheckBoxViewComponent,
                related_product_component_1.RelatedProductComponent,
                product_box_one_component_1.ProductBoxOneComponent,
                search_list_component_1.SearchListComponent,
                template_address_component_1.TemplateAddressComponent,
                button_modal_view_component_1.ButtonModalViewComponent,
                template_order_view_component_1.TemplateOrderViewComponent,
                template_shipping_view_component_1.TemplateShippingViewComponent,
                auto_focus_invalid_input_directive_1.AutoFocusInvalidInputDirective,
                buttons_modal_routes_component_1.ButtonsModalRoutesComponent,
                products_list_any_component_1.ProductsListAnyComponent,
                form_search_filter_component_1.FormSearchFilterComponent,
                card_products_component_1.CardProductsComponent,
                form_address_client_component_1.FormAddressClientComponent,
                form_client_component_1.FormClientComponent,
                create_client_component_1.CreateClientComponent,
                template_guide_view_component_1.TemplateGuideViewComponent,
                list_client_component_1.ListClientComponent,
                multi_sel_component_1.MultiSelComponent,
                card_bank_account_component_1.CardBankAccountComponent,
                list_imported_credit_movements_component_1.ListImportedCreditMovementsComponent,
                list_imported_debit_movements_component_1.ListImportedDebitMovementsComponent,
                scanner_qr_barcode_component_1.ScannerQrBarcodeComponent,
                template_purchase_view_component_1.TemplatePurchaseViewComponent,
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                forms_1.FormsModule,
                ng2_smart_table_1.Ng2SmartTableModule,
                forms_1.ReactiveFormsModule,
                ng_select2_1.NgSelect2Module,
                ngx_datatable_1.NgxDatatableModule,
                ng_bootstrap_1.NgbModule,
                ngx_scanner_1.ZXingScannerModule
            ],
            providers: [nav_service_1.NavService, windows_service_1.WINDOW_PROVIDERS],
            exports: [
                feather_icons_component_1.FeatherIconsComponent,
                fullscreen_directive_1.ToggleFullscreenDirective,
                input_img_component_1.InputImgComponent,
                ng_lazyload_image_1.LazyLoadImageModule,
                related_product_component_1.RelatedProductComponent,
                search_list_component_1.SearchListComponent,
                template_address_component_1.TemplateAddressComponent,
                auto_focus_invalid_input_directive_1.AutoFocusInvalidInputDirective,
                buttons_modal_routes_component_1.ButtonsModalRoutesComponent,
                products_list_any_component_1.ProductsListAnyComponent,
                form_search_filter_component_1.FormSearchFilterComponent,
                card_products_component_1.CardProductsComponent,
                form_address_client_component_1.FormAddressClientComponent,
                form_client_component_1.FormClientComponent,
                create_client_component_1.CreateClientComponent,
                list_client_component_1.ListClientComponent,
                multi_sel_component_1.MultiSelComponent,
                card_bank_account_component_1.CardBankAccountComponent,
                list_imported_credit_movements_component_1.ListImportedCreditMovementsComponent,
                list_imported_debit_movements_component_1.ListImportedDebitMovementsComponent,
                scanner_qr_barcode_component_1.ScannerQrBarcodeComponent,
                template_order_view_component_1.TemplateOrderViewComponent,
                template_purchase_view_component_1.TemplatePurchaseViewComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
