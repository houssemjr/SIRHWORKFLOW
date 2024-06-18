import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierRHComponent } from './calendrier-rh.component';

describe('CalendrierRHComponent', () => {
  let component: CalendrierRHComponent;
  let fixture: ComponentFixture<CalendrierRHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendrierRHComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendrierRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
