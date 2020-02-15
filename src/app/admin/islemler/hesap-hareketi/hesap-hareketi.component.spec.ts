import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HesapHareketiComponent } from './hesap-hareketi.component';

describe('HesapHareketiComponent', () => {
  let component: HesapHareketiComponent;
  let fixture: ComponentFixture<HesapHareketiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesapHareketiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesapHareketiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
