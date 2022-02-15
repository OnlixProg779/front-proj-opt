"use strict";
exports.__esModule = true;
exports.content = void 0;
exports.content = [
    {
        path: 'dashboard',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); }
    },
    {
        path: 'products',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/products/products.module'); }).then(function (m) { return m.ProductsModule; }); },
        data: {
            breadcrumb: "Products"
        }
    },
    {
        path: 'postbox',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/sales/sales.module'); }).then(function (m) { return m.SalesModule; }); },
        data: {
            breadcrumb: "Post box"
        }
    },
    {
        path: 'coupons',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/coupons/coupons.module'); }).then(function (m) { return m.CouponsModule; }); },
        data: {
            breadcrumb: "Coupons"
        }
    },
    {
        path: 'purchases',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/purchases/purchases.module'); }).then(function (m) { return m.PurchasesModule; }); },
        data: {
            breadcrumb: "Purchases"
        }
    },
    {
        path: 'guides',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/pages/pages.module'); }).then(function (m) { return m.PagesModule; }); },
        data: {
            breadcrumb: "Guides"
        }
    },
    {
        path: 'refunds',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/media/media.module'); }).then(function (m) { return m.MediaModule; }); },
        data: {
            breadcrumb: "Refunds"
        }
    },
    {
        path: 'deposits',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/menus/menus.module'); }).then(function (m) { return m.MenusModule; }); },
        data: {
            breadcrumb: "Deposits"
        }
    },
    {
        path: 'clients',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/users/users.module'); }).then(function (m) { return m.UsersModule; }); },
        data: {
            breadcrumb: "Clients"
        }
    },
    {
        path: 'agency',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/agency/agency.module'); }).then(function (m) { return m.AgencyModule; }); },
        data: {
            breadcrumb: "Agency"
        }
    },
    {
        path: 'vendors',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/vendors/vendors.module'); }).then(function (m) { return m.VendorsModule; }); },
        data: {
            breadcrumb: "Vendors"
        }
    },
    // {
    //   path: 'localization',
    //   loadChildren: () => import('../../components/localization/localization.module').then(m => m.LocalizationModule),
    //   data: {
    //     breadcrumb: "Localization"
    //   }
    // },
    // {
    //   path: 'reports',
    //   loadChildren: () => import('../../components/reports/reports.module').then(m => m.ReportsModule),
    // },
    {
        path: 'settings',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/setting/setting.module'); }).then(function (m) { return m.SettingModule; }); },
        data: {
            breadcrumb: "Settings"
        }
    },
    {
        path: 'shipping',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../components/invoice/invoice.module'); }).then(function (m) { return m.InvoiceModule; }); },
        data: {
            breadcrumb: "Shipping"
        }
    }
];
