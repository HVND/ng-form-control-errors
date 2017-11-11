import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnInit,
    TemplateRef
} from '@angular/core';
import {FormControl} from "@angular/forms";

type Errors = { [error: string]: string };

@Component({
    selector: 'control-errors',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container messageLoader [template]="template" [message]="error"></ng-container>
    `,
})
export class NgFormControlErrorsComponent implements OnInit {

    @Input() control: FormControl;

    @Input() errors: Errors;

    @ContentChild(TemplateRef) template: TemplateRef<any>;

    error: string;

    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.detectErrors();
        this.control.valueChanges.subscribe(() => this.detectErrors());
        this.control.statusChanges.subscribe(() => this.detectErrors());
    }

    detectErrors(): void {
        this.error = '';

        if (this.control.errors && (!!this.control.value || (this.control.dirty || this.control.touched))) {
            for (let err in this.control.errors) {
                if (this.control.errors.hasOwnProperty(err)) {
                    if (this.errors[err]) {
                        this.error = this.errors[err];
                    }
                }
            }
        }

        this.cd.markForCheck();
    }
}
