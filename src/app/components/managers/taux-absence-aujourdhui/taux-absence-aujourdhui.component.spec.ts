import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxAbsenceAujourdhuiComponent } from './taux-absence-aujourdhui.component';

describe('TauxAbsenceAujourdhuiComponent', () => {
  let component: TauxAbsenceAujourdhuiComponent;
  let fixture: ComponentFixture<TauxAbsenceAujourdhuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TauxAbsenceAujourdhuiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TauxAbsenceAujourdhuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
