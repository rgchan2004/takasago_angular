import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterDeadlineComponent } from './enter-deadline.component';

describe('EnterDeadlineComponent', () => {
  let component: EnterDeadlineComponent;
  let fixture: ComponentFixture<EnterDeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterDeadlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterDeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
