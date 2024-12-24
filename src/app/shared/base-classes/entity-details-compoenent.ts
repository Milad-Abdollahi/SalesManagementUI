import { OnInit, Directive, signal, OnDestroy, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { EntityService } from '../services/entity-service.interface';
import { FieldBase } from './field-base';
import { FieldControlService } from '../services/field-control-service';
import { HelperFunctions } from '../helper-functions';

@Directive()
export abstract class EntityDetailsComponent<
    TEntity,
    TCreateDto,
    TService extends EntityService<TEntity, TCreateDto>
> implements OnInit, OnDestroy
{
    //Todo**: get rid of the:   finalize(() => console.log('Subscription finalized (unsubscribed or completed)'))  parts!!!
    protected destroy$ = new Subject<void>();

    public form!: FormGroup;
    public fields: FieldBase<string>[] = [];

    protected abstract id: number;
    protected abstract entityService: TService;
    protected abstract router: Router;
    protected navigateUrlAfterNewEntityAdded: string = '';

    protected fieldControlService = inject(FieldControlService);

    isEditingSignal = signal(false);

    ngOnInit(): void {
        this.initializeForm();
        this.loadEntity();
    }

    protected initializeForm(): void {
        this.entityService
            .getFields()
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => console.log('Subscription finalized (unsubscribed or completed)'))
            )
            .subscribe({
                next: (fields) => {
                    this.fields = fields;
                    this.form = this.fieldControlService.toFormGroup(fields);
                    this.form.disable();
                },
            });
    }

    protected loadEntity(): void {
        this.entityService
            .getById(this.id)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => console.log('Subscription finalized (unsubscribed or completed)'))
            )
            .subscribe({
                next: (entity) => {
                    this.form.patchValue(entity as { [key: string]: any });
                },
            });
    }

    onEditing() {
        this.form.enable();
        this.isEditingSignal.set(true);
    }

    onSaveNew() {
        const createDto: TCreateDto = this.createDtoFromFields();
        this.entityService
            .create(createDto)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => console.log('Subscription finalized (unsubscribed or completed)'))
            )
            .subscribe({
                next: (res) => {
                    this.handleSuccess(res);
                    this.router.navigate([this.navigateUrlAfterNewEntityAdded, (res as any).id]);
                },
                error: (err) => {
                    window.alert(HelperFunctions.extractErrorMessages(err.error));
                    throw new Error(err);
                },
                complete: () => {
                    this.form.disable();
                    this.isEditingSignal.set(false);
                },
            });
        console.log(createDto);
    }

    onSubmit() {
        const createDto: TCreateDto = this.createDtoFromFields();
        this.entityService
            .edit(this.id, createDto)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => console.log('Subscription finalized (unsubscribed or completed)'))
            )
            .subscribe({
                next: (res) => this.handleSuccess(res),
                error: (err) => {
                    window.alert(HelperFunctions.extractErrorMessages(err.error));
                    throw new Error(err);
                },
                complete: () => {
                    this.form.disable();
                    this.isEditingSignal.set(false);
                },
            });
    }

    onDelete() {
        this.entityService
            .delete(this.id)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => console.log('Subscription finalized (unsubscribed or completed)'))
            )
            .subscribe({
                next: () => this.router.navigate(['/']),
                error: (err) => this.handleError(err),
            });
    }

    protected createDtoFromFields(): TCreateDto {
        const dto: Partial<TCreateDto> = {};
        this.fields.forEach((field) => {
            if (
                field.includeInDto
                // !== false
            ) {
                dto[field.key as keyof TCreateDto] = this.form.get(field.key)?.value;
            }
        });
        return dto as TCreateDto;
    }

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
