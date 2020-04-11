import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorcListComponent } from './borc-list.component';

describe('BorcListComponent', () => {
  let component: BorcListComponent;
  let fixture: ComponentFixture<BorcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
