"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var chartData = require("../../shared/data/chart");
var chart_1 = require("../../shared/data/chart");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
        this.doughnutData = chart_1.doughnutData;
        this.pieData = chart_1.pieData;
        // doughnut 2
        this.view = chartData.view;
        this.doughnutChartColorScheme = chartData.doughnutChartcolorScheme;
        this.doughnutChartShowLabels = chartData.doughnutChartShowLabels;
        this.doughnutChartGradient = chartData.doughnutChartGradient;
        this.doughnutChartTooltip = chartData.doughnutChartTooltip;
        this.chart5 = chartData.chart5;
        // lineChart
        this.lineChartData = chartData.lineChartData;
        this.lineChartLabels = chartData.lineChartLabels;
        this.lineChartOptions = chartData.lineChartOptions;
        this.lineChartColors = chartData.lineChartColors;
        this.lineChartLegend = chartData.lineChartLegend;
        this.lineChartType = chartData.lineChartType;
        // lineChart
        this.smallLineChartData = chartData.smallLineChartData;
        this.smallLineChartLabels = chartData.smallLineChartLabels;
        this.smallLineChartOptions = chartData.smallLineChartOptions;
        this.smallLineChartColors = chartData.smallLineChartColors;
        this.smallLineChartLegend = chartData.smallLineChartLegend;
        this.smallLineChartType = chartData.smallLineChartType;
        // lineChart
        this.smallLine2ChartData = chartData.smallLine2ChartData;
        this.smallLine2ChartLabels = chartData.smallLine2ChartLabels;
        this.smallLine2ChartOptions = chartData.smallLine2ChartOptions;
        this.smallLine2ChartColors = chartData.smallLine2ChartColors;
        this.smallLine2ChartLegend = chartData.smallLine2ChartLegend;
        this.smallLine2ChartType = chartData.smallLine2ChartType;
        // lineChart
        this.smallLine3ChartData = chartData.smallLine3ChartData;
        this.smallLine3ChartLabels = chartData.smallLine3ChartLabels;
        this.smallLine3ChartOptions = chartData.smallLine3ChartOptions;
        this.smallLine3ChartColors = chartData.smallLine3ChartColors;
        this.smallLine3ChartLegend = chartData.smallLine3ChartLegend;
        this.smallLine3ChartType = chartData.smallLine3ChartType;
        // lineChart
        this.smallLine4ChartData = chartData.smallLine4ChartData;
        this.smallLine4ChartLabels = chartData.smallLine4ChartLabels;
        this.smallLine4ChartOptions = chartData.smallLine4ChartOptions;
        this.smallLine4ChartColors = chartData.smallLine4ChartColors;
        this.smallLine4ChartLegend = chartData.smallLine4ChartLegend;
        this.smallLine4ChartType = chartData.smallLine4ChartType;
        this.chart3 = chartData.chart3;
        Object.assign(this, { doughnutData: chart_1.doughnutData, pieData: chart_1.pieData });
    }
    DashboardComponent.prototype.codeCharged = function (response) {
        console.log(response);
    };
    DashboardComponent.prototype.ngOnInit = function () {
    };
    // events
    DashboardComponent.prototype.chartClicked = function (e) {
    };
    DashboardComponent.prototype.chartHovered = function (e) {
    };
    DashboardComponent.prototype.add = function () {
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
