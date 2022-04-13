import { TestBed } from '@angular/core/testing';

import { MinefieldService } from './minefield.service';

describe('AppService', () => {
  let service: MinefieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinefieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
