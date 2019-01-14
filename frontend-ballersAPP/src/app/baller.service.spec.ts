import { TestBed } from '@angular/core/testing';

import { BallerService } from './baller.service';

describe('BallerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BallerService = TestBed.get(BallerService);
    expect(service).toBeTruthy();
  });
});
