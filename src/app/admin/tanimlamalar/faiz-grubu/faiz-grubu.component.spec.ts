import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaizGrubuComponent } from './faiz-grubu.component';

describe('FaizGrubuComponent', () => {
  let component: FaizGrubuComponent;
  let fixture: ComponentFixture<FaizGrubuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaizGrubuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaizGrubuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
