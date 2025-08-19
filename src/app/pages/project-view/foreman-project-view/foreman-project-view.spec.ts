import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForemanProjectView } from './foreman-project-view';

describe('ForemanProjectView', () => {
  let component: ForemanProjectView;
  let fixture: ComponentFixture<ForemanProjectView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForemanProjectView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForemanProjectView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
