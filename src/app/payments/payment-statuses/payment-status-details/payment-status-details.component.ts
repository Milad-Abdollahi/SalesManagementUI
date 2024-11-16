import {
    Component,
    DestroyRef,
    inject,
    Input,
    numberAttribute,
    OnInit,
    signal,
    Signal,
} from '@angular/core';
import {
    // createFormFields,
    PaymentStatusService,
} from '../../../shared/services/payment-status.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentStatusCreateDto } from '../../../DataAccess/Models/Dto/payment-status-create-dto';
import { HelperFunctions } from '../../../shared/helper-functions';
import { Observable } from 'rxjs';
import { FieldBase } from '../../../shared/base-classes/field-base';
import { FieldControlService } from '../../../shared/services/field-control-service';
import { EntityFormFieldComponent } from '../../../shared/components/entity-form-field/entity-form-field.component';
import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-payment-status-details',
    standalone: true,
    imports: [ReactiveFormsModule, EntityFormFieldComponent, EntityFormComponent, AsyncPipe],
    templateUrl: './payment-status-details.component.html',
    styleUrl: './payment-status-details.component.css',
})
export class PaymentStatusDetailsComponent implements OnInit {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;

    private paymentStatusService = inject(PaymentStatusService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);

    public paymentStatus = this.paymentStatusService.loadedPaymentStatus;

    public isEditing = false;
    public fieldsSignal: Signal<FieldBase<any>[]> =
        this.paymentStatusService.selectedPaymentStatusFormFields.asReadonly();

    // TEST
    field$?: Observable<FieldBase<any>[]>;

    //TEST2

    // Todo**:
    public paymentStatusForm = new FormGroup({
        id: new FormControl<number | undefined>({ value: undefined, disabled: true }),
        statusName: new FormControl<string | undefined>({ value: undefined, disabled: true }),
    });

    ngOnInit(): void {
        // TEST
        this.field$ = this.paymentStatusService.getFields();
        // End of TEST

        // TEST 2

        // END of TEST 2

        const subscription = this.paymentStatusService.getById(this.id).subscribe({
            next: () => {
                this.paymentStatusForm.patchValue({
                    id: this.paymentStatus()?.id,
                    statusName: this.paymentStatus()?.statusName,
                });
            },
            error: (err) => console.log(err),
        });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    onEditing() {
        this.isEditing = true;
        this.paymentStatusForm.get('statusName')?.enable();
    }

    onSubmit() {
        // console.log(this.paymentStatusService.selectedEntityFormFields());

        const data: PaymentStatusCreateDto = {
            statusName: this.paymentStatusForm.value.statusName!,
        };
        const subscription = this.paymentStatusService.edit(this.id, data).subscribe({
            next: (resData) => {
                console.log(resData);
            },
            error: (err) => {
                // console.dir(err);
                window.alert(HelperFunctions.extractErrorMessages(err.error));
            },
            complete: () => {
                this.paymentStatusForm.get('statusName')?.disable();
                this.isEditing = false;
            },
        });
        this.destroyRef.onDestroy(() => subscription.unsubscribe);
    }

    onDelete() {
        const deleteSubscription = this.paymentStatusService.delete(this.id).subscribe({
            next: (resData) => {
                console.log(resData);
                this.router.navigate(['payments/payment-statuses']);
            },
        });
        this.destroyRef.onDestroy(() => {
            deleteSubscription.unsubscribe();
        });
    }
}
