import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagimsizBolumListComponent } from './bagimsiz-bolum-list.component';

describe('BagimsizBolumListComponent', () => {
  let component: BagimsizBolumListComponent;
  let fixture: ComponentFixture<BagimsizBolumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagimsizBolumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagimsizBolumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
