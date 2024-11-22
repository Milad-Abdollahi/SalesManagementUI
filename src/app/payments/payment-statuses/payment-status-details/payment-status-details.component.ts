import {
    Component,
    DestroyRef,
    inject,
    Input,
    numberAttribute,
    OnInit,
    signal,
} from '@angular/core';
import {
    // createFormFields,
    PaymentStatusService,
} from '../../../shared/services/payment-status.service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentStatusCreateDto } from '../../../DataAccess/Models/Dto/payment-status-create-dto';
import { HelperFunctions } from '../../../shared/helper-functions';
import { Observable, tap } from 'rxjs';
import { FieldBase } from '../../../shared/base-classes/field-base';
import { FieldControlService } from '../../../shared/services/field-control-service';
import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { EntityDetailsComponent } from '../../../shared/base-classes/entity-details-compoenent';
import { IPaymentStatus } from '../../../DataAccess/Models/payment-status.model';

@Component({
    selector: 'app-payment-status-details',
    standalone: true,
    imports: [ReactiveFormsModule, EntityFormComponent],
    templateUrl: './payment-status-details.component.html',
    styleUrl: './payment-status-details.component.css',
})
export class PaymentStatusDetailsComponent extends EntityDetailsComponent<
    IPaymentStatus,
    PaymentStatusCreateDto,
    PaymentStatusService
> {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;

    // Todo**: protected override service: PaymentStatusService = inject(PaymentStatusService);
    service = inject(PaymentStatusService);
    router = inject(Router);

    // Todo**: fieldControlService = inject(FieldControlService);
    constructor(public override fieldControlService: FieldControlService) {
        super();
    }

    private paymentStatusService = inject(PaymentStatusService);
    private destroyRef = inject(DestroyRef);
    // Todo**: try meking router private

    public paymentStatus = this.paymentStatusService.loadedPaymentStatus;

    /////////////////////////// OLD ////////////////////////////
    /////////////////////////// OLD ////////////////////////////
    /////////////////////////// OLD ////////////////////////////
    /////////////////////////// OLD ////////////////////////////
    /////////////////////////// OLD ////////////////////////////

    // isEditingSignal = signal(false);

    // field$?: Observable<FieldBase<any>[]>;
    // fields: FieldBase<string>[] = [];

    // public entityForm!: FormGroup;

    // ngOnInit(): void {
    //     this.field$ = this.paymentStatusService.getFields();

    //     const fieldsSubscription = this.paymentStatusService.getFields().subscribe({
    //         next: (fields) => {
    //             this.fields = fields;
    //             this.entityForm = this.fieldControlService.toFormGroup(fields);
    //         },
    //     });

    //     const subscription = this.paymentStatusService.getById(this.id).subscribe({
    //         next: () => {
    //             this.entityForm.patchValue({
    //                 id: this.paymentStatus()?.id,
    //                 statusName: this.paymentStatus()?.statusName,
    //             });
    //         },
    //         error: (err) => console.log(err),
    //     });

    //     this.destroyRef.onDestroy(() => {
    //         subscription.unsubscribe();
    //         fieldsSubscription.unsubscribe();
    //     });
    // }

    // onEditing() {
    //     this.isEditingSignal.set(true);
    // }

    // onSubmit() {
    //     const data: PaymentStatusCreateDto = {
    //         statusName: this.entityForm.value.statusName,
    //     };
    //     const subscription = this.paymentStatusService.edit(this.id, data).subscribe({
    //         next: (resData) => {
    //             console.log(resData);
    //         },
    //         error: (err) => {
    //             window.alert(HelperFunctions.extractErrorMessages(err.error));
    //         },
    //         complete: () => {
    //             this.entityForm.get('statusName')?.disable();
    //             this.isEditingSignal.set(false);
    //         },
    //     });
    //     this.destroyRef.onDestroy(() => subscription.unsubscribe);
    // }

    // onDelete() {
    //     const deleteSubscription = this.paymentStatusService.delete(this.id).subscribe({
    //         next: (resData) => {
    //             console.log(resData);
    //             this.router.navigate(['payments/payment-statuses']);
    //         },
    //     });
    //     this.destroyRef.onDestroy(() => {
    //         deleteSubscription.unsubscribe();
    //     });
    // }
}
