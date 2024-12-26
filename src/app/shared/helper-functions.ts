import { Observable, of } from 'rxjs';
import { FieldConfig } from './interfaces/FieldConfig';
import { FieldBase } from './base-classes/field-base';

export class HelperFunctions {
    static extractErrorMessages(errorResponse: any): string[] {
        const errorMessages: string[] = [];
        if (errorResponse.errors) {
            for (const key in errorResponse.errors) {
                if (errorResponse.errors.hasOwnProperty(key)) {
                    errorMessages.push(...errorResponse.errors[key]);
                }
            }
        }
        return errorMessages;
    }
}

// Todo: move the function inside the HelperFunctions class
// Todo: remove <T>
export function generateFields<T>(fieldsConfig: {
    [key: string]: FieldConfig;
}): Observable<FieldBase<string>[]> {
    const fields: FieldBase<string>[] = Object.keys(fieldsConfig).map((key, index) => {
        const fieldConfig = fieldsConfig[key];
        return new FieldBase<string>({
            initialValue: fieldConfig.initialValue,
            key,
            label: fieldConfig?.label || key,
            controlType: fieldConfig?.controlType || 'textbox',
            type: fieldConfig?.type,
            validators: fieldConfig?.validators || [],
            required: fieldConfig?.required,
            order: fieldConfig?.order || index + 1,
            disabled: fieldConfig?.disabled,
            includeInDto: fieldConfig?.includeInDto,
            options: fieldConfig?.options || [],
        });
    });
    return of(fields.sort((a, b) => a.order - b.order));
}
