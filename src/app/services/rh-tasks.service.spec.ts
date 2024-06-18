import { TestBed } from '@angular/core/testing';

import { RhTasksService } from './rh-tasks.service';

describe('RhTasksService', () => {
  let service: RhTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RhTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
