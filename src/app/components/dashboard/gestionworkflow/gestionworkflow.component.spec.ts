import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionworkflowComponent } from './gestionworkflow.component';

describe('GestionworkflowComponent', () => {
  let component: GestionworkflowComponent;
  let fixture: ComponentFixture<GestionworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionworkflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
