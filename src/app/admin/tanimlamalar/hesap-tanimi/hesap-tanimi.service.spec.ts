import { TestBed } from '@angular/core/testing';

import { HesapTanimiService } from './hesap-tanimi.service';

describe('HesapTanimiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HesapTanimiService = TestBed.get(HesapTanimiService);
    expect(service).toBeTruthy();
  });
});
