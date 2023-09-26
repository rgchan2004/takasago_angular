import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpisHeaderComponent } from './cpis-header.component';

describe('CpisHeaderComponent', () => {
  let component: CpisHeaderComponent;
  let fixture: ComponentFixture<CpisHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpisHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpisHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
