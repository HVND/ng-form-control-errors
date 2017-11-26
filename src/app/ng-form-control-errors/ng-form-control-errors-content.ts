import {ContentChild, Directive} from '@angular/core';
import {FormControl, FormControlName} from "@angular/forms";

@Directive({
    selector: '.control-errors-content',
    exportAs: 'controlErrorsContent',
})
export class NgFormControlErrorsContent {

    @ContentChild(FormControlName) formControlName: FormControlName;

    get formControl(): FormControl | null {
        return (this.formControlName && ('control' in this.formControlName)) ? this.formControlName.control : null;
    }
}
