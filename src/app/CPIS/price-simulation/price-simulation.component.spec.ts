import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSimulationComponent } from './price-simulation.component';

describe('PriceSimulationComponent', () => {
  let component: PriceSimulationComponent;
  let fixture: ComponentFixture<PriceSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceSimulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
