import { Validator, ValidatorFn, Validators } from '@angular/forms';

export class FieldBase<T> {
    initialValue: T | undefined;
    key: string;
    label: string;
    required?: boolean;
    order: number = 0; 
    controlType: string;
    type?: string;
    validators: ValidatorFn[];
    disabled?: boolean;
    includeInDto?: boolean;
    options?: { key: string; value: string }[];
    constructor(options: {
        initialValue: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        validators?: ValidatorFn[];
        disabled?: boolean;
        includeInDto?: boolean;
        options?: { key: string; value: string }[];
    }) {
        this.initialValue = options.initialValue;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.validators = options.validators || [];
        this.disabled = options.disabled;
        this.includeInDto = options.includeInDto !== undefined ? options.includeInDto : true;
        this.options = options.options || [];
    }
}
