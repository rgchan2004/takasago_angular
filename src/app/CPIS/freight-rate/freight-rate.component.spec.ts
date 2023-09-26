import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightRateComponent } from './freight-rate.component';

describe('FreightRateComponent', () => {
  let component: FreightRateComponent;
  let fixture: ComponentFixture<FreightRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreightRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
