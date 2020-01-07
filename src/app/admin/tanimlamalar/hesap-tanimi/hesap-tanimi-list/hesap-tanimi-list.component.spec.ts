import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HesapTanimiListComponent } from './hesap-tanimi-list.component';

describe('HesapTanimiListComponent', () => {
  let component: HesapTanimiListComponent;
  let fixture: ComponentFixture<HesapTanimiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesapTanimiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesapTanimiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
