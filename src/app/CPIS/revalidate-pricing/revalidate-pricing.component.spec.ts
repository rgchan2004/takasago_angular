import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevalidatePricingComponent } from './revalidate-pricing.component';

describe('RevalidatePricingComponent', () => {
  let component: RevalidatePricingComponent;
  let fixture: ComponentFixture<RevalidatePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevalidatePricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevalidatePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
