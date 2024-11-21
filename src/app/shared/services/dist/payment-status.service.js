"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.generateFields = exports.PaymentStatusService = void 0;
var core_1 = require("@angular/core");
var payment_status_repository_service_1 = require("../../DataAccess/Repo/payment-status-repository.service");
var rxjs_1 = require("rxjs");
var field_base_1 = require("../base-classes/field-base");
var forms_1 = require("@angular/forms");
var PaymentStatusService = /** @class */ (function () {
    function PaymentStatusService() {
        this.paymentStatusRepositoryService = core_1.inject(payment_status_repository_service_1.PaymentStatusRepositoryService);
        this.paymentStatuses = core_1.signal([]);
        this.loadedEntities = this.paymentStatuses.asReadonly();
        this.selectedPaymentStatus = core_1.signal(undefined);
        this.loadedPaymentStatus = this.selectedPaymentStatus.asReadonly();
        this.selectedPaymentStatusFormFields = core_1.signal([]);
        this.fieldConfig = {
            // Todo**: change the name of value to initialValue also make it optional
            id: {
                initialValue: undefined,
                key: 'id',
                label: 'ID',
                controlType: 'textbox',
                disabled: true,
                order: 1
            },
            statusName: {
                initialValue: undefined,
                key: 'statusName',
                label: 'Status Name',
                controlType: 'textbox',
                validators: [forms_1.Validators.required],
                order: 2
            }
        };
    }
    // Create
    PaymentStatusService.prototype.create = function (paymentStatusCreateDto) {
        return this.paymentStatusRepositoryService
            .create('https://localhost:7276/api/', 'PaymentStatuses', paymentStatusCreateDto)
            .pipe(rxjs_1.tap({
            error: function (err) {
                console.log(err);
            }
        }));
    };
    // Read
    PaymentStatusService.prototype.getAll = function () {
        var _this = this;
        return this.paymentStatusRepositoryService
            .readAll('https://localhost:7276/api/', 'PaymentStatuses')
            .pipe(rxjs_1.tap({
            next: function (paymentStatuses) {
                _this.paymentStatuses.set(paymentStatuses);
            }
        }));
    };
    PaymentStatusService.prototype.getById = function (id) {
        var _this = this;
        return this.paymentStatusRepositoryService
            .readById('https://localhost:7276/api/', 'PaymentStatuses/', id)
            .pipe(rxjs_1.tap({
            next: function (paymentStatus) {
                _this.selectedPaymentStatus.set(paymentStatus);
            }
        }));
    };
    // Update
    PaymentStatusService.prototype.edit = function (id, paymentStatusCreateDto) {
        return this.paymentStatusRepositoryService
            .update('https://localhost:7276/api/', 'PaymentStatuses/', id, paymentStatusCreateDto)
            .pipe(rxjs_1.tap({
            error: function (err) {
                console.dir(err.error);
            }
        }));
    };
    // Delete
    PaymentStatusService.prototype["delete"] = function (id) {
        return this.paymentStatusRepositoryService["delete"]('https://localhost:7276/api/', "PaymentStatuses/", id);
    };
    // TEST
    // Todo**: try using a signal for this
    // Todo**: get from a remote source of field metadata
    PaymentStatusService.prototype.getFields = function () {
        return generateFields(this.fieldConfig);
    };
    PaymentStatusService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PaymentStatusService);
    return PaymentStatusService;
}());
exports.PaymentStatusService = PaymentStatusService;
function generateFields(
// interfaceDef: T,
config) {
    var fields = Object.keys(config).map(function (key, index) {
        var fieldConfig = config[key];
        return new field_base_1.FieldBase({
            initialValue: fieldConfig.initialValue,
            key: key,
            label: (fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.label) || key,
            controlType: (fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.controlType) || 'textbox',
            type: fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.type,
            validators: (fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.validators) || [],
            required: fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.required,
            order: (fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.order) || index + 1,
            disabled: fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.disabled,
            options: (fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.options) || []
        });
    });
    return rxjs_1.of(fields.sort(function (a, b) { return a.order - b.order; }));
}
exports.generateFields = generateFields;
