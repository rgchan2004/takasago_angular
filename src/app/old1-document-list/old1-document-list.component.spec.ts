import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Old1DocumentListComponent } from './old1-document-list.component';

describe('Old1DocumentListComponent', () => {
  let component: Old1DocumentListComponent;
  let fixture: ComponentFixture<Old1DocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Old1DocumentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Old1DocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
