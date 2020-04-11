import { TestBed } from '@angular/core/testing';

import { FaizGrubuService } from './faiz-grubu.service';

describe('FaizGrubuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaizGrubuService = TestBed.get(FaizGrubuService);
    expect(service).toBeTruthy();
  });
});
