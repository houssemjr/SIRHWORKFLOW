import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddequipeComponent } from './addequipe.component';

describe('AddequipeComponent', () => {
  let component: AddequipeComponent;
  let fixture: ComponentFixture<AddequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddequipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
