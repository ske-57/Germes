import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSubtaskDetail } from './manager-subtask-detail';

describe('ManagerSubtaskDetail', () => {
  let component: ManagerSubtaskDetail;
  let fixture: ComponentFixture<ManagerSubtaskDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerSubtaskDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerSubtaskDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
