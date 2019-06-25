import { TestBed } from '@angular/core/testing';

import { TempPasswordService } from './temp-password.service';

describe('TempPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempPasswordService = TestBed.get(TempPasswordService);
    expect(service).toBeTruthy();
  });
});
