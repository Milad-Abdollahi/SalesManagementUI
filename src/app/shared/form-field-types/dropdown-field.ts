import { FieldBase } from '../base-classes/field-base';

export class DropdownField extends FieldBase<string> {
    override controlType = 'dropdown';
}
