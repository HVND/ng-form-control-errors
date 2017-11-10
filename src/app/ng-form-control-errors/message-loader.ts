import {Directive, EmbeddedViewRef, Input, OnChanges, OnDestroy, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[messageLoader]',
})
export class MessageLoader implements OnChanges, OnDestroy {

    @Input() template: TemplateRef<any>;

    @Input() message: any;

    view: EmbeddedViewRef<any>;

    constructor(private viewContainer: ViewContainerRef) {
    }

    ngOnChanges() {
        if (!!this.view) {
            this.view.destroy();
        }

        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.message,
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}
