import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HesapHareketiYukleComponent } from './hesap-hareketi-yukle.component';

describe('HesapHareketiYukleComponent', () => {
  let component: HesapHareketiYukleComponent;
  let fixture: ComponentFixture<HesapHareketiYukleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesapHareketiYukleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesapHareketiYukleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
