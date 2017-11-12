import {Directive, EmbeddedViewRef, Input, OnChanges, OnDestroy, TemplateRef, ViewContainerRef} from "@angular/core";

import {Error} from "./ng-form-control-errors.component";

@Directive({
    selector: '[messageLoader]',
})
export class MessageLoader implements OnChanges, OnDestroy {

    @Input() template: TemplateRef<any>;

    @Input() error: Error;

    view: EmbeddedViewRef<any>;

    constructor(private viewContainer: ViewContainerRef) {
    }

    ngOnChanges() {
        if (!!this.view) {
            this.view.destroy();
        }

        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.error,
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}
