import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTests } from './add-tests';

describe('AddTests', () => {
  let component: AddTests;
  let fixture: ComponentFixture<AddTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
