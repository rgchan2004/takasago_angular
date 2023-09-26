import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutSystemQuotationComponent } from './out-system-quotation.component';

describe('OutSystemQuotationComponent', () => {
  let component: OutSystemQuotationComponent;
  let fixture: ComponentFixture<OutSystemQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutSystemQuotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutSystemQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
