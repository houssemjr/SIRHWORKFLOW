import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDiagramComponent } from './gestiondiagram.component';

describe('GestiondiagramComponent', () => {
  let component: GestionDiagramComponent;
  let fixture: ComponentFixture<GestionDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDiagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
