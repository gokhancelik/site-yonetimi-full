import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagimsizBolumKisiListComponent } from './bagimsiz-bolum-kisi-list.component';

describe('BagimsizBolumKisiListComponent', () => {
  let component: BagimsizBolumKisiListComponent;
  let fixture: ComponentFixture<BagimsizBolumKisiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagimsizBolumKisiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagimsizBolumKisiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
