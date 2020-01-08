import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KisiListComponent } from './kisi-list.component';

describe('KisiListComponent', () => {
  let component: KisiListComponent;
  let fixture: ComponentFixture<KisiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KisiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KisiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
