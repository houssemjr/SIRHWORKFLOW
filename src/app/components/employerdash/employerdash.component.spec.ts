import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerdashComponent } from './employerdash.component';

describe('EmployerdashComponent', () => {
  let component: EmployerdashComponent;
  let fixture: ComponentFixture<EmployerdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerdashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
