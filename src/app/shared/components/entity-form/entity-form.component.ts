import { Component, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
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
    @Input() form!: FormGroup;
    @Input() isEditingSignal!: WritableSignal<boolean>;

    @Output() submitEvent = new EventEmitter<void>();
    @Output() deleteEvent = new EventEmitter<void>();

    // public isEditing = false;

    constructor(private fieldControlService: FieldControlService) {}
    ngOnInit(): void {
        if (this.isEditingSignal()) {
            this.form.enable();
            //Todo**: try disabling id automatically based on @Input() fields: FieldBase<string>[]
            this.form.get('id')?.disable();
        }
    }
    onSubmit() {
        console.log(this.form);
        this.submitEvent.emit();

        this.form.markAsPristine();
        this.form.markAsUntouched();
    }
    onEditing() {
        this.form.enable();
        this.form.get('id')?.disable();
        this.isEditingSignal.set(true);
    }
    onDelete() {
        this.deleteEvent.emit();
    }
}
