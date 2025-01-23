import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
    initialValue: any;
    key: string;
    label: string;
    controlType: 'textbox' | 'dropdown' | 'group';
    type?: string;
    validators?: ValidatorFn[];
    required?: boolean;
    order?: number;
    disabled?: boolean;
    includeInDto?: boolean;
    options?: { key: string; value: string }[];
}
