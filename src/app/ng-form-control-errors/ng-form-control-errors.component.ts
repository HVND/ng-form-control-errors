import {
    AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, OnDestroy, Optional,
    Renderer2
} from '@angular/core';
import {FormControl} from '@angular/forms';

import {NgFormControlErrorsContent} from './ng-form-control-errors-content';

export interface Error {
    name: string;
    message: string;
}

export interface Errors { [error: string]: string; }

@Component({
    selector: 'control-errors,[control-errors]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container>{{ error?.message }}</ng-container>
    `,
})
export class NgFormControlErrorsComponent implements AfterContentInit, OnDestroy {

    @Input() control: FormControl;

    @Input() errors: Errors;

    error: Error;

    elFormCtrlBlurListener: Function;

    elFormCtrlFocusListener: Function;

    constructor(private cd: ChangeDetectorRef,
                private renderer: Renderer2,
                @Optional() @Host() private controlErrorsContent: NgFormControlErrorsContent) {
    }

    ngAfterContentInit() {
        this.control = this.control ? this.control : this.formControl;

        if (this.control && this.elFormControl) {
            this.detectErrors();

            this.elFormCtrlBlurListener = this.renderer.listen(
                this.elFormControl, 'blur', () => this.detectErrors());
            this.elFormCtrlFocusListener = this.renderer.listen(
                this.elFormControl, 'focus', () => this.detectErrors());

            this.control.valueChanges.subscribe(() => this.detectErrors());
            this.control.statusChanges.subscribe(() => this.detectErrors());
        }
    }

    detectErrors(): void {
        this.error = <Error>{};

        if (this.invalid) {
            for (const err in this.control.errors) {
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

    get elFormControl() {
        return this.controlErrorsContent ? this.controlErrorsContent.elFormControl : null;
    }

    ngOnDestroy(): void {
        this.unbindElFormCtrlBlurListener();
        this.unbindElFormCtrlFocusListener();
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
}
