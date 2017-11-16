import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

export interface Error {
    name: string;
    message: string;
}

export type Errors = { [error: string]: string };

@Component({
    selector: 'control-errors,[control-errors]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container>{{ error?.message }}</ng-container>
    `,
})
export class NgFormControlErrorsComponent implements OnInit {

    @Input() control: FormControl;

    @Input() errors: Errors;

    error: Error;

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.detectErrors();
        this.control.valueChanges.subscribe(() => this.detectErrors());
        this.control.statusChanges.subscribe(() => this.detectErrors());
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
}
