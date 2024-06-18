import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeencoursComponent } from './demandeencours.component';

describe('DemandeencoursComponent', () => {
  let component: DemandeencoursComponent;
  let fixture: ComponentFixture<DemandeencoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeencoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeencoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
