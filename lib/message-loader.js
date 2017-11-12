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
var MessageLoader = (function () {
    function MessageLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    MessageLoader.prototype.ngOnChanges = function () {
        if (!!this.view) {
            this.view.destroy();
        }
        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.error,
        });
    };
    MessageLoader.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return MessageLoader;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], MessageLoader.prototype, "template", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", ng_form_control_errors_component_1.Error)
], MessageLoader.prototype, "error", void 0);
MessageLoader = __decorate([
    core_1.Directive({
        selector: '[messageLoader]',
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], MessageLoader);
exports.MessageLoader = MessageLoader;
//# sourceMappingURL=message-loader.js.map