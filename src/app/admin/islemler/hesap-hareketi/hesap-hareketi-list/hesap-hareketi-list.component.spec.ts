import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HesapHareketiListComponent } from './hesap-hareketi-list.component';

describe('HesapHareketiListComponent', () => {
  let component: HesapHareketiListComponent;
  let fixture: ComponentFixture<HesapHareketiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesapHareketiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesapHareketiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
