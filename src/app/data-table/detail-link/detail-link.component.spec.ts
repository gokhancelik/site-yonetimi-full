import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLinkComponent } from './detail-link.component';

describe('DetailLinkComponent', () => {
  let component: DetailLinkComponent;
  let fixture: ComponentFixture<DetailLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
