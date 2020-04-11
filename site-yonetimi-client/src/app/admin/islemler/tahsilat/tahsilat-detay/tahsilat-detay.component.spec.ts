import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahsilatDetayComponent } from './tahsilat-detay.component';

describe('TahsilatDetayComponent', () => {
  let component: TahsilatDetayComponent;
  let fixture: ComponentFixture<TahsilatDetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahsilatDetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahsilatDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
