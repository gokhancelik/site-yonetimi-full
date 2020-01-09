import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GelirGiderTanimComponent } from './gelir-gider-tanim.component';

describe('GelirGiderTanimComponent', () => {
  let component: GelirGiderTanimComponent;
  let fixture: ComponentFixture<GelirGiderTanimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GelirGiderTanimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GelirGiderTanimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
