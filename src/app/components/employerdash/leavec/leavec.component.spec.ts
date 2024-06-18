import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavecComponent } from './leavec.component';

describe('LeavecComponent', () => {
  let component: LeavecComponent;
  let fixture: ComponentFixture<LeavecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeavecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
