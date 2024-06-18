import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecollabComponent } from './profilecollab.component';

describe('ProfilecollabComponent', () => {
  let component: ProfilecollabComponent;
  let fixture: ComponentFixture<ProfilecollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilecollabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilecollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
