import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanStageDetail } from './foreman-stage-detail';

describe('ForemanStageDetail', () => {
  let component: ForemanStageDetail;
  let fixture: ComponentFixture<ForemanStageDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForemanStageDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForemanStageDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
