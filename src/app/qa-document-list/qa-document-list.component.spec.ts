import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QADocumentListComponent } from './qa-document-list.component';

describe('QADocumentListComponent', () => {
  let component: QADocumentListComponent;
  let fixture: ComponentFixture<QADocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QADocumentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QADocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
