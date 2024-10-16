import { TestBed } from '@angular/core/testing';

import { PaymentStatusRepositoryService } from './payment-status-repository.service';

describe('PaymentStatusRepositoryService', () => {
  let service: PaymentStatusRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentStatusRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
