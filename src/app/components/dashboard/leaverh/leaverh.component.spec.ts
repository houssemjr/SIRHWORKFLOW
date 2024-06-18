import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaverhComponent } from './leaverh.component';

describe('LeaverhComponent', () => {
  let component: LeaverhComponent;
  let fixture: ComponentFixture<LeaverhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaverhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaverhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
