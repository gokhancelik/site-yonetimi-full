import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagimsizBolumDetayComponent } from './bagimsiz-bolum-detay.component';

describe('BagimsizBolumDetayComponent', () => {
  let component: BagimsizBolumDetayComponent;
  let fixture: ComponentFixture<BagimsizBolumDetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagimsizBolumDetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagimsizBolumDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
