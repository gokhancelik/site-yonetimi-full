import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdemeGatewayComponent } from './odeme-gateway.component';

describe('OdemeGatewayComponent', () => {
  let component: OdemeGatewayComponent;
  let fixture: ComponentFixture<OdemeGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdemeGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdemeGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
