import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KisiDetayComponent } from './kisi-detay.component';

describe('KisiDetayComponent', () => {
  let component: KisiDetayComponent;
  let fixture: ComponentFixture<KisiDetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KisiDetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KisiDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
