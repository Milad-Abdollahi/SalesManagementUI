import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldBase } from '../base-classes/field-base';

@Injectable({ providedIn: 'root' })
export class FieldControlService {
    toFormGroup(fields: FieldBase<string>[]) {
        const group: any = {};
        fields.forEach((field) => {
            group[field.key] = field.disabled
                ? new FormControl(
                      { value: field.initialValue || null, disabled: true },
                      { validators: field.validators }
                  )
                : new FormControl(field.initialValue || null, {
                      validators: field.validators,
                  });
        });
        return new FormGroup(group);
    }

    updateFormGroupValues(form: FormGroup, fields: FieldBase<string>[]): void {
        fields.forEach((field) => {
            if (form.controls[field.key]) {
                form.controls[field.key].setValue(field.initialValue, {
                    emitEvent: false,
                });
                if (field.disabled) {
                    form.controls[field.key].disable({ emitEvent: false });
                } else {
                    form.controls[field.key].enable({ emitEvent: false });
                }
            }
        });
    }
}
