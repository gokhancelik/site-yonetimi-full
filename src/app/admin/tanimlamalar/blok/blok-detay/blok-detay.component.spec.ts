import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlokDetayComponent } from './blok-detay.component';

describe('BlokDetayComponent', () => {
  let component: BlokDetayComponent;
  let fixture: ComponentFixture<BlokDetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlokDetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlokDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
