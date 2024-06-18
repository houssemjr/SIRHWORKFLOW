import { TestBed } from '@angular/core/testing';

import { KeycService } from './keyc.service';

describe('KeycService', () => {
  let service: KeycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
