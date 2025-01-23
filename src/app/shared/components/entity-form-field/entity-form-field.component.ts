import { Component, input, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FieldBase } from '../../base-classes/field-base';

@Component({
    selector: 'app-entity-form-field',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './entity-form-field.component.html',
    styleUrl: './entity-form-field.component.css',
})
export class EntityFormFieldComponent implements OnInit {
    ngOnInit(): void {
        // console.dir(this.field);
    }
    @Input() field!: FieldBase<string>;
    @Input() form!: FormGroup;
    @Input() options?: { key: string; value: string }[];

    // Todo**: try replacing this with a signal
    public get isValid(): boolean {
        return this.form.controls[this.field.key].valid;
    }



}
