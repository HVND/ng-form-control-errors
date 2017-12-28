import {AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, Optional, Renderer2} from '@angular/core';
import {FormControl} from '@angular/forms';

import {NgFormControlErrorsContent} from './ng-form-control-errors-content';

export interface Error {
    name: string;
    message: string;
}

export interface Errors {
    [error: string]: string;
}

@Component({
    selector: 'control-errors,[control-errors]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container>{{ error?.message }}</ng-container>
    `,
})
export class NgFormControlErrorsComponent implements AfterContentInit {

    @Input() errors: Errors;

    error: Error;

    constructor(private cd: ChangeDetectorRef,
                private renderer: Renderer2,
                @Optional() @Host() private controlErrorsContent: NgFormControlErrorsContent) {

        if (!this.controlErrorsContent) {
            throw new Error(
                'control-errors must be used with a parent .control-errors-content directive');
        }
    }

    ngAfterContentInit() {
        this.detectErrors();
        this.controlErrorsContent.onChange$.subscribe(() => this.detectErrors());
    }

    detectErrors(): void {
        this.error = <Error>{};

        if (this.invalid) {
            for (const err in this.formControl.errors) {
                if (this.formControl.errors.hasOwnProperty(err)) {
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
        return this.controlErrorsContent.invalid;
    }

    get formControl(): FormControl {
        return this.controlErrorsContent.formControl;
    }
}
