import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahakkukListComponent } from './tahakkuk-list.component';

describe('TahakkukListComponent', () => {
  let component: TahakkukListComponent;
  let fixture: ComponentFixture<TahakkukListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahakkukListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahakkukListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
