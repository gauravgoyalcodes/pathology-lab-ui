import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhlebos } from './add-phlebos';

describe('AddPhlebos', () => {
  let component: AddPhlebos;
  let fixture: ComponentFixture<AddPhlebos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPhlebos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhlebos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
