import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HesapTanimiComponent } from './hesap-tanimi.component';

describe('HesapTanimiComponent', () => {
  let component: HesapTanimiComponent;
  let fixture: ComponentFixture<HesapTanimiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesapTanimiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesapTanimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
