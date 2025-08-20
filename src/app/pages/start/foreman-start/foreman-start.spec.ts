import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanStart } from './foreman-start';

describe('ForemanStart', () => {
  let component: ForemanStart;
  let fixture: ComponentFixture<ForemanStart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForemanStart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForemanStart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
