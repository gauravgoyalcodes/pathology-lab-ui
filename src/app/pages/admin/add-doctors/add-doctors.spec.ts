import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctors } from './add-doctors';

describe('AddDoctors', () => {
  let component: AddDoctors;
  let fixture: ComponentFixture<AddDoctors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDoctors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
