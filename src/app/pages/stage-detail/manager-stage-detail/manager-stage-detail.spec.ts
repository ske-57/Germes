import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStageDetail } from './manager-stage-detail';

describe('ManagerStageDetail', () => {
  let component: ManagerStageDetail;
  let fixture: ComponentFixture<ManagerStageDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerStageDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerStageDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
