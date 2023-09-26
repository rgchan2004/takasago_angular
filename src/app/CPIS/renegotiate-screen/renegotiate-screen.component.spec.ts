import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenegotiateScreenComponent } from './renegotiate-screen.component';

describe('RenegotiateScreenComponent', () => {
  let component: RenegotiateScreenComponent;
  let fixture: ComponentFixture<RenegotiateScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenegotiateScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenegotiateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
