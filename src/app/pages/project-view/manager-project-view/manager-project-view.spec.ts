import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProjectView } from './manager-project-view';

describe('ManagerProjectView', () => {
  let component: ManagerProjectView;
  let fixture: ComponentFixture<ManagerProjectView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerProjectView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerProjectView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
