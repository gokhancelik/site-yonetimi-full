import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahsilatKalemListComponent } from './tahsilat-kalem-list.component';

describe('TahsilatKalemListComponent', () => {
  let component: TahsilatKalemListComponent;
  let fixture: ComponentFixture<TahsilatKalemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahsilatKalemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahsilatKalemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
