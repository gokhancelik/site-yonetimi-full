import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahsilatComponent } from './tahsilat.component';

describe('TahsilatComponent', () => {
  let component: TahsilatComponent;
  let fixture: ComponentFixture<TahsilatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahsilatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahsilatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
