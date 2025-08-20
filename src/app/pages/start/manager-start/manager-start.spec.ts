import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStart } from './manager-start';

describe('ManagerStart', () => {
  let component: ManagerStart;
  let fixture: ComponentFixture<ManagerStart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerStart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerStart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
