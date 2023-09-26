import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedDocumentComponent } from './attached-document.component';

describe('AttachedDocumentComponent', () => {
  let component: AttachedDocumentComponent;
  let fixture: ComponentFixture<AttachedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachedDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
