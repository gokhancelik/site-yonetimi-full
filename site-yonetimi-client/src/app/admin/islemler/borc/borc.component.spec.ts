import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorcComponent } from './borc.component';

describe('BorcComponent', () => {
  let component: BorcComponent;
  let fixture: ComponentFixture<BorcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
