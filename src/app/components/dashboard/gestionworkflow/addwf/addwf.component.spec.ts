import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwfComponent } from './addwf.component';

describe('AddwfComponent', () => {
  let component: AddwfComponent;
  let fixture: ComponentFixture<AddwfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddwfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddwfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
