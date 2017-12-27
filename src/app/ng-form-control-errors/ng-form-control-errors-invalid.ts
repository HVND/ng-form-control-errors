import {
    AfterViewInit,
    Attribute,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Host,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import {FormControl} from "@angular/forms";

import {NgFormControlErrorsContent} from "./ng-form-control-errors-content";

@Directive({
    selector: '[controlErrorsInvalid]',
    exportAs: 'controlErrorsInvalid',
})
export class NgFormControlErrorsInvalid implements AfterViewInit, OnChanges, OnDestroy {

    @Input() control: FormControl;

    classes: string[] = [];

    elFormCtrlBlurListener: Function;

    elFormCtrlFocusListener: Function;

    constructor(private element: ElementRef,
                private renderer: Renderer2,
                private cdr: ChangeDetectorRef,
                @Optional() @Attribute('class') private hasClasses: string,
                @Optional() @Host() private controlErrorsContent: NgFormControlErrorsContent) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.update();
    }

    ngAfterViewInit() {
        this.control = this.control ? this.control : this.formControl;

        if (this.control) {

            this.elFormCtrlBlurListener = this.renderer.listen(
                this.elFormControl, 'blur', () => this.update());
            this.elFormCtrlFocusListener = this.renderer.listen(
                this.elFormControl, 'focus', () => this.update());


            this.control.valueChanges.subscribe(() => this.update());
            this.control.statusChanges.subscribe(() => this.update());
        }
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
        if (!this.hasClasses) return false;
        return this.hasClasses.includes(className);
    }

    get invalid(): boolean {
        if (this.control) {
            return this.control.errors && (!!this.control.value || (this.control.dirty || this.control.touched));
        } else {
            return false;
        }
    }

    get formControl(): FormControl | null {
        return this.controlErrorsContent ? this.controlErrorsContent.formControl : null;
    }

    unbindElFormCtrlBlurListener() {
        if (this.elFormCtrlBlurListener) {
            this.elFormCtrlBlurListener();
            this.elFormCtrlBlurListener = null;
        }
    }

    unbindElFormCtrlFocusListener() {
        if (this.elFormCtrlFocusListener) {
            this.elFormCtrlFocusListener();
            this.elFormCtrlFocusListener = null;
        }
    }

    get elFormControl() {
        return this.controlErrorsContent ? this.controlErrorsContent.elFormControl : null;
    }

    ngOnDestroy(): void {
        this.unbindElFormCtrlBlurListener();
        this.unbindElFormCtrlFocusListener();
    }
}
