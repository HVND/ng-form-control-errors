import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {NgFormControlErrorsModule} from "./ng-form-control-errors/ng-form-control-errors.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        NgFormControlErrorsModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
