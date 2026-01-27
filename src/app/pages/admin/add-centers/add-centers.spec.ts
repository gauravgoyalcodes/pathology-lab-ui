import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCenters } from './add-centers';

describe('AddCenters', () => {
  let component: AddCenters;
  let fixture: ComponentFixture<AddCenters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCenters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCenters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
