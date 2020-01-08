import { TestBed } from '@angular/core/testing';

import { KisiService } from './kisi.service';

describe('KisiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KisiService = TestBed.get(KisiService);
    expect(service).toBeTruthy();
  });
});
