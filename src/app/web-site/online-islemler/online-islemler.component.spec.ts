import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineIslemlerComponent } from './online-islemler.component';

describe('OnlineIslemlerComponent', () => {
  let component: OnlineIslemlerComponent;
  let fixture: ComponentFixture<OnlineIslemlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineIslemlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineIslemlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
