import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmotifComponent } from './addmotif.component';

describe('AddmotifComponent', () => {
  let component: AddmotifComponent;
  let fixture: ComponentFixture<AddmotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmotifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
