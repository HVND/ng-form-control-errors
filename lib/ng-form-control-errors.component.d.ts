import { ChangeDetectorRef, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
export interface Error {
    name: string;
    message: string;
}
export declare type Errors = {
    [error: string]: string;
};
export declare class NgFormControlErrorsComponent implements OnInit {
    private cd;
    control: FormControl;
    errors: Errors;
    template: TemplateRef<any>;
    error: Error;
    constructor(cd: ChangeDetectorRef);
    ngOnInit(): void;
    detectErrors(): void;
    readonly invalid: boolean;
}
