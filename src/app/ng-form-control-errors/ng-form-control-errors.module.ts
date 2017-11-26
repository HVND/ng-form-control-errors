import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgFormControlErrorsComponent} from './ng-form-control-errors.component';
import {NgFormControlErrorsContent} from './ng-form-control-errors-content';
import {NgFormControlErrorsInvalid} from './ng-form-control-errors-invalid';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgFormControlErrorsComponent,
        NgFormControlErrorsContent,
        NgFormControlErrorsInvalid,
    ],
    exports: [
        NgFormControlErrorsComponent,
        NgFormControlErrorsContent,
        NgFormControlErrorsInvalid
    ]
})
export class NgFormControlErrorsModule {
}
