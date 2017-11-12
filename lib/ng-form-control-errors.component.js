"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NgFormControlErrorsComponent = (function () {
    function NgFormControlErrorsComponent(cd) {
        this.cd = cd;
    }
    NgFormControlErrorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.detectErrors();
        this.control.valueChanges.subscribe(function () { return _this.detectErrors(); });
        this.control.statusChanges.subscribe(function () { return _this.detectErrors(); });
    };
    NgFormControlErrorsComponent.prototype.detectErrors = function () {
        this.error = {};
        if (this.control.errors && (!!this.control.value || (this.control.dirty || this.control.touched))) {
            for (var err in this.control.errors) {
                if (this.control.errors.hasOwnProperty(err)) {
                    if (this.errors[err]) {
                        this.error = {
                            name: err,
                            message: this.errors[err]
                        };
                    }
                }
            }
        }
        this.cd.markForCheck();
    };
    return NgFormControlErrorsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], NgFormControlErrorsComponent.prototype, "control", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgFormControlErrorsComponent.prototype, "errors", void 0);
__decorate([
    core_1.ContentChild(core_1.TemplateRef),
    __metadata("design:type", core_1.TemplateRef)
], NgFormControlErrorsComponent.prototype, "template", void 0);
NgFormControlErrorsComponent = __decorate([
    core_1.Component({
        selector: 'control-errors,[control-errors]',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        template: "\n        <ng-container *ngIf=\"!!template; else defaultTemplate\">\n            <ng-container messageLoader [template]=\"template\" [error]=\"error\"></ng-container>\n        </ng-container>\n        <ng-template #defaultTemplate>{{ error?.message }}</ng-template>\n    ",
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], NgFormControlErrorsComponent);
exports.NgFormControlErrorsComponent = NgFormControlErrorsComponent;
//# sourceMappingURL=ng-form-control-errors.component.js.map