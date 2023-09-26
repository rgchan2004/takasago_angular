import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectScreenComponent } from './approve-reject-screen.component';

describe('ApproveRejectScreenComponent', () => {
  let component: ApproveRejectScreenComponent;
  let fixture: ComponentFixture<ApproveRejectScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRejectScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRejectScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
