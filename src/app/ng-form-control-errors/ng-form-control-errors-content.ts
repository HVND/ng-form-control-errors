import {ContentChild, Directive} from '@angular/core';
import {FormControl, FormControlDirective, FormControlName, NgModel} from "@angular/forms";

@Directive({
    selector: '.control-errors-content',
    exportAs: 'controlErrorsContent',
})
export class NgFormControlErrorsContent {

    @ContentChild(FormControlName) _formCtrlName: FormControlName;

    @ContentChild(FormControlDirective) _formCtrlDir: FormControlDirective;

    @ContentChild(NgModel) _ngModel: NgModel;

    get formControl(): FormControl | null {
        let _formControl = null;

        if (this._formCtrlName) {
            _formControl = this._formCtrlName;
        } else if (this._formCtrlDir) {
            _formControl = this._formCtrlDir;
        } else if (this._ngModel) {
            _formControl = this._ngModel;
        }

        if (_formControl) {
            _formControl = ('control' in _formControl) ? _formControl.control : null;
        }

        return _formControl;
    }
}
