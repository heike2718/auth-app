import { TestBed } from '@angular/core/testing';

import { AuthErrorService } from './auth-error.service';

describe('AuthErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthErrorService = TestBed.get(AuthErrorService);
    expect(service).toBeTruthy();
  });
});
