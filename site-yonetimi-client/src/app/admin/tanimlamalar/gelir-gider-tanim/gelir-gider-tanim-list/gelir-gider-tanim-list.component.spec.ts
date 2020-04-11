import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GelirGiderTanimListComponent } from './gelir-gider-tanim-list.component';

describe('GelirGiderTanimListComponent', () => {
  let component: GelirGiderTanimListComponent;
  let fixture: ComponentFixture<GelirGiderTanimListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GelirGiderTanimListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GelirGiderTanimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
