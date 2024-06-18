import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencemanagerComponent } from './absencemanager.component';

describe('AbsencemanagerComponent', () => {
  let component: AbsencemanagerComponent;
  let fixture: ComponentFixture<AbsencemanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsencemanagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsencemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
