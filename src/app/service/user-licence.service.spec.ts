import { TestBed } from '@angular/core/testing';

import { UserLicenceService } from './user-licence.service';

describe('UserLicenceService', () => {
  let service: UserLicenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLicenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
