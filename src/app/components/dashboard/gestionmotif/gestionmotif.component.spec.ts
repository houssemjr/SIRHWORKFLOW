import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionmotifComponent } from './gestionmotif.component';

describe('GestionmotifComponent', () => {
  let component: GestionmotifComponent;
  let fixture: ComponentFixture<GestionmotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionmotifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionmotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
