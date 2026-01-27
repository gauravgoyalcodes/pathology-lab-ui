import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhlebos } from './manage-phlebos';

describe('ManagePhlebos', () => {
  let component: ManagePhlebos;
  let fixture: ComponentFixture<ManagePhlebos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePhlebos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePhlebos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
