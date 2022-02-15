"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContentLayoutComponent = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var ng_animate_1 = require("ng-animate");
var ContentLayoutComponent = /** @class */ (function () {
    function ContentLayoutComponent(navServices) {
        this.navServices = navServices;
        // public layoutType: string = 'RTL';
        this.layoutClass = false;
    }
    ContentLayoutComponent.prototype.getRouterOutletState = function (outlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    };
    ContentLayoutComponent.prototype.rightSidebar = function ($event) {
        this.right_side_bar = $event;
    };
    // public clickRtl(val) {
    //   if (val === 'RTL') {
    //     document.body.className = 'rtl';
    //     this.layoutClass = true;
    //     this.layoutType = 'LTR';
    //   } else {
    //     document.body.className = '';
    //     this.layoutClass = false;
    //     this.layoutType = 'RTL';
    //   }
    // }
    ContentLayoutComponent.prototype.ngOnInit = function () { };
    ContentLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-content-layout',
            templateUrl: './content-layout.component.html',
            styleUrls: ['./content-layout.component.scss'],
            animations: [
                animations_1.trigger('animateRoute', [animations_1.transition('* => *', animations_1.useAnimation(ng_animate_1.fadeIn, {
                    // Set the duration to 5seconds and delay to 2 seconds
                    //params: { timing: 3}
                    }))])
            ]
        })
    ], ContentLayoutComponent);
    return ContentLayoutComponent;
}());
exports.ContentLayoutComponent = ContentLayoutComponent;
