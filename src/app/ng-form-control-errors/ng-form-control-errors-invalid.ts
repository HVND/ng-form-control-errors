import {
    Attribute,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Host,
    Input,
    OnChanges,
    OnInit,
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
export class NgFormControlErrorsInvalid implements OnInit, OnChanges {
    @Input() control: FormControl;

    classes: string[] = [];

    constructor(private element: ElementRef,
                private renderer: Renderer2,
                private cdr: ChangeDetectorRef,
                @Attribute('class') private hasClasses: string,
                @Optional() @Host() private controlErrorsContent: NgFormControlErrorsContent) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.update();
    }

    ngOnInit(): void {
        this.control = this.control ? this.control : this.formControl;

        if (this.control) {
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
            if (!this.hasClasses.includes(c) && this.invalid) {
                this.renderer.addClass(this.element.nativeElement, c);
            } else {
                this.renderer.removeClass(this.element.nativeElement, c);
            }
        });

        this.cdr.markForCheck();
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

}
