import { Component, Input, OnInit } from '@angular/core';
import { FieldBase } from '../../base-classes/field-base';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntityFormFieldComponent } from '../entity-form-field/entity-form-field.component';
import { FieldControlService } from '../../services/field-control-service';

@Component({
    selector: 'app-entity-form',
    standalone: true,
    providers: [FieldControlService],
    imports: [CommonModule, EntityFormFieldComponent, ReactiveFormsModule],
    templateUrl: './entity-form.component.html',
    styleUrl: './entity-form.component.css',
})
export class EntityFormComponent implements OnInit {
    @Input() fields: FieldBase<string>[] | null = [];
    form!: FormGroup;
    payLoad = '';
    constructor(private fieldControlService: FieldControlService) {}
    ngOnInit(): void {
        this.form = this.fieldControlService.toFormGroup(this.fields as FieldBase<string>[]);
    }
    onSubmit() {
        this.payLoad = JSON.stringify(this.form.getRawValue());
        console.log(this.form);
    }
}
