import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgFormControlErrorsComponent} from './ng-form-control-errors.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgFormControlErrorsComponent,
    ],
    exports: [
        NgFormControlErrorsComponent
    ]
})
export class NgFormControlErrorsModule {
}
