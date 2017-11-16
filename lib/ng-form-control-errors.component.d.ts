import { ChangeDetectorRef, OnInit } from '@angular/core';
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
    error: Error;
    constructor(cd: ChangeDetectorRef);
    ngOnInit(): void;
    detectErrors(): void;
    readonly invalid: boolean;
}
