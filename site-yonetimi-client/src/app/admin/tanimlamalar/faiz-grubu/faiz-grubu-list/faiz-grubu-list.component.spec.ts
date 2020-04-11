import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaizGrubuListComponent } from './faiz-grubu-list.component';

describe('FaizGrubuListComponent', () => {
  let component: FaizGrubuListComponent;
  let fixture: ComponentFixture<FaizGrubuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaizGrubuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaizGrubuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
