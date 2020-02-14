import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahakkukComponent } from './tahakkuk.component';

describe('TahakkukComponent', () => {
  let component: TahakkukComponent;
  let fixture: ComponentFixture<TahakkukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahakkukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahakkukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
