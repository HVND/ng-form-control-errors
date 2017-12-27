import {ContentChild, Directive, ElementRef} from '@angular/core';
import {FormControl, FormControlDirective, FormControlName, NgModel} from '@angular/forms';

@Directive({
    selector: '.control-errors-content',
    exportAs: 'controlErrorsContent',
})
export class NgFormControlErrorsContent {

    @ContentChild(FormControlName) _formCtrlName: FormControlName;

    @ContentChild(FormControlDirective) _formCtrlDir: FormControlDirective;

    @ContentChild(NgModel) _ngModel: NgModel;

    @ContentChild(FormControlName, {read: ElementRef}) _elFormCtrlName: ElementRef;

    @ContentChild(FormControlDirective, {read: ElementRef}) _elFormCtrlDir: ElementRef;

    @ContentChild(NgModel, {read: ElementRef}) _elNgModel: ElementRef;

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

    get elFormControl(): HTMLElement | null {
        let _elFormControl = null;

        if (this._elFormCtrlName) {
            _elFormControl = this._elFormCtrlName.nativeElement;
        } else if (this._elFormCtrlDir) {
            _elFormControl = this._elFormCtrlDir.nativeElement;
        } else if (this._elNgModel) {
            _elFormControl = this._elNgModel.nativeElement;
        }

        return _elFormControl;
    }
}
