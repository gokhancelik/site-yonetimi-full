import { TestBed } from '@angular/core/testing';

import { GelirGiderTanimService } from './gelir-gider-tanim.service';

describe('GelirGiderTanimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GelirGiderTanimService = TestBed.get(GelirGiderTanimService);
    expect(service).toBeTruthy();
  });
});
