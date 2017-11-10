import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.email,
                ])
            ],
            phoneNumber: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
                ])
            ]
        });
    }
}
