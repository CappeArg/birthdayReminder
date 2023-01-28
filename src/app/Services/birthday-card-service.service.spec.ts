import { TestBed } from '@angular/core/testing';

import { BirthdayCardServiceService } from './birthday-card-service.service';

describe('BirthdayCardServiceService', () => {
  let service: BirthdayCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthdayCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
