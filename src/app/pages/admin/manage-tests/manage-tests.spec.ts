import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTests } from './manage-tests';

describe('ManageTests', () => {
  let component: ManageTests;
  let fixture: ComponentFixture<ManageTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
