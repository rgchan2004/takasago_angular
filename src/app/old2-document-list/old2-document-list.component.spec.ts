import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Old2DocumentListComponent } from './old2-document-list.component';

describe('Old2DocumentListComponent', () => {
  let component: Old2DocumentListComponent;
  let fixture: ComponentFixture<Old2DocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Old2DocumentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Old2DocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
