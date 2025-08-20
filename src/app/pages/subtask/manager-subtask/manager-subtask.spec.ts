import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSubtask } from './manager-subtask';

describe('ManagerSubtask', () => {
  let component: ManagerSubtask;
  let fixture: ComponentFixture<ManagerSubtask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerSubtask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerSubtask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
