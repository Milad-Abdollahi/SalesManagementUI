// import { Injectable } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { FieldBase } from '../base-classes/field-base';

// @Injectable()
// export class FieldControlService {
//     toFormGroup(fields: FieldBase<string>[]) {
//         const group: any = {};
//         fields.forEach((field) => {
//             group[field.key] = field.required
//                 ? new FormControl(field.value || '', Validators.required)
//                 : new FormControl(field.value || '');
//         });
//         return new FormGroup(group);
//     }

//     createFormGroup(fields: FieldBase<string>[]){

//     }

// }

import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldBase } from '../base-classes/field-base';

@Injectable()
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

    createFormGroup(fields: FieldBase<string>[]) {}
}
