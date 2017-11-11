import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    formGroup: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup(
            {
                email: new FormControl('', [
                    Validators.required,
                    Validators.email,
                ]),
                phoneNumber: new FormControl('', [
                    Validators.required,
                    Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
                ]),
            },
            // {updateOn: 'blur'}
        );
    }
}
