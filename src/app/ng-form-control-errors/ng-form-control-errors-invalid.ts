import {
    AfterViewInit, Attribute, ChangeDetectorRef, Directive, ElementRef, Host, Input, OnChanges, Optional, Renderer2,
    SimpleChanges
} from '@angular/core';

import {NgFormControlErrorsContent} from './ng-form-control-errors-content';

@Directive({
    selector: '[controlErrorsInvalid]',
    exportAs: 'controlErrorsInvalid',
})
export class NgFormControlErrorsInvalid implements AfterViewInit, OnChanges {

    classes: string[] = [];

    constructor(private element: ElementRef,
                private renderer: Renderer2,
                private cdr: ChangeDetectorRef,
                @Optional() @Attribute('class') private hasClasses: string,
                @Optional() @Host() private controlErrorsContent: NgFormControlErrorsContent) {

        if (!this.controlErrorsContent) {
            throw new Error(
                'control-errors must be used with a parent .control-errors-content directive');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.update();
    }

    ngAfterViewInit() {
        this.controlErrorsContent.onChange$.subscribe(() => this.update());
    }

    @Input()
    set controlErrorsInvalid(data: string[] | string) {
        const classes = Array.isArray(data) ? data : data.split(' ');
        this.classes = classes.filter(c => !!c);
    }

    update(): void {
        this.classes.forEach((c: string) => {
            if (!this.hasClass(c) && this.invalid) {
                this.renderer.addClass(this.element.nativeElement, c);
            } else {
                this.renderer.removeClass(this.element.nativeElement, c);
            }
        });

        this.cdr.markForCheck();
    }

    hasClass(className: string): boolean {
        if (!this.hasClasses) {
            return false;
        }

        return this.hasClasses.includes(className);
    }

    get invalid(): boolean {
        return this.controlErrorsContent.invalid;
    }
}
