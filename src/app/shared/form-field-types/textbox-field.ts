import { FieldBase } from '../base-classes/field-base';

export class TextBoxField extends FieldBase<string> {
    override controlType = 'textbox';
}
