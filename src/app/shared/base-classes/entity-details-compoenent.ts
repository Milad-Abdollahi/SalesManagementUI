import { OnInit, DestroyRef, Directive, signal, OnDestroy, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntityService } from '../services/entity-service.interface';
import { FieldBase } from './field-base';
import { FieldControlService } from '../services/field-control-service';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Directive()
export abstract class EntityDetailsComponent<
    TEntity,
    TCreateDto,
    TService extends EntityService<TEntity, TCreateDto>
> implements OnInit, OnDestroy
{
    protected destroy$ = new Subject<void>();

    public form!: FormGroup;
    public fields: FieldBase<string>[] = [];

    protected abstract id: number;
    protected abstract service: TService;
    protected abstract router: Router;

    protected fieldControlService = inject(FieldControlService);

    isEditingSignal = signal(false);

    ngOnInit(): void {
        this.initializeForm();
        this.loadEntity();
    }

    protected initializeForm(): void {
        this.service.getFields().subscribe({
            next: (fields) => {
                this.fields = fields;
                this.form = this.fieldControlService.toFormGroup(fields);
            },
        });
    }
    protected loadEntity(): void {
        this.service.getById(this.id).subscribe({
            next: (entity) => {
                this.form.patchValue(entity as { [key: string]: any });
            },
        });
    }

    onEditing() {
        this.form.enable();
        this.isEditingSignal.set(true);
    }

    onSubmit() {
        const data: TCreateDto = this.createDtoFormForm();
        this.service.edit(this.id, data).subscribe({
            next: (res) => this.handleSuccess(res),
            error: (res) => this.handleError(res),
            complete: () => {
                this.form.disable();
                this.isEditingSignal.set(false);
            },
        });
    }

    onDelete() {
        this.service.delete(this.id).subscribe({
            next: () => this.router.navigate(['/']),
            error: (err) => this.handleError(err),
        });
    }

    protected abstract createDtoFormForm(): TCreateDto;

    protected handleSuccess(response: any): void {
        console.log('operation successful: ', response);
    }
    protected handleError(error: any): void {
        console.error('An error occurred:', error);
        // Optionally, display an error message to the user
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
