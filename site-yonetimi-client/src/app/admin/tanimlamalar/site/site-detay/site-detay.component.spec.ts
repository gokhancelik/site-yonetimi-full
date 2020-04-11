import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDetayComponent } from './site-detay.component';

describe('SiteDetayComponent', () => {
  let component: SiteDetayComponent;
  let fixture: ComponentFixture<SiteDetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
