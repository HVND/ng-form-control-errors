import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgFormControlErrorsComponent} from './ng-form-control-errors.component';
import {MessageLoader} from "./message-loader";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgFormControlErrorsComponent,
        MessageLoader
    ],
    exports: [
        NgFormControlErrorsComponent,
        MessageLoader
    ]
})
export class NgFormControlErrorsModule {
}
