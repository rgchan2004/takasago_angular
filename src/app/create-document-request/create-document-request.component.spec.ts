import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentRequestComponent } from './create-document-request.component';

describe('CreateDocumentRequestComponent', () => {
  let component: CreateDocumentRequestComponent;
  let fixture: ComponentFixture<CreateDocumentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDocumentRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDocumentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
