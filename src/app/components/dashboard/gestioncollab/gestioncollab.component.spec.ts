import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncollabComponent } from './gestioncollab.component';

describe('GestioncollabComponent', () => {
  let component: GestioncollabComponent;
  let fixture: ComponentFixture<GestioncollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestioncollabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioncollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
