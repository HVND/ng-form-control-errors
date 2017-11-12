import { EmbeddedViewRef, OnChanges, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { Error } from "./ng-form-control-errors.component";
export declare class MessageLoader implements OnChanges, OnDestroy {
    private viewContainer;
    template: TemplateRef<any>;
    error: Error;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnChanges(): void;
    ngOnDestroy(): void;
}
