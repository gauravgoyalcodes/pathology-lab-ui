import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCenters } from './manage-centers';

describe('ManageCenters', () => {
  let component: ManageCenters;
  let fixture: ComponentFixture<ManageCenters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCenters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCenters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
