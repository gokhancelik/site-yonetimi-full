import { TestBed } from '@angular/core/testing';

import { OnlineIslemlerService } from './online-islemler.service';

describe('OnlineIslemlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineIslemlerService = TestBed.get(OnlineIslemlerService);
    expect(service).toBeTruthy();
  });
});
