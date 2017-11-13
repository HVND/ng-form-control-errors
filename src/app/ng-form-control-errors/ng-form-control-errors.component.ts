import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnInit,
    TemplateRef
} from '@angular/core';
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
        <ng-container *ngIf="!!template; else defaultTemplate">
            <ng-container messageLoader [template]="template" [error]="error"></ng-container>
        </ng-container>
        <ng-template #defaultTemplate>{{ error?.message }}</ng-template>
    `,
})
export class NgFormControlErrorsComponent implements OnInit {

    @Input() control: FormControl;

    @Input() errors: Errors;

    @ContentChild(TemplateRef) template: TemplateRef<any>;

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
