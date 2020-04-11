import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahsilatListComponent } from './tahsilat-list.component';

describe('TahsilatListComponent', () => {
  let component: TahsilatListComponent;
  let fixture: ComponentFixture<TahsilatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahsilatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahsilatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
