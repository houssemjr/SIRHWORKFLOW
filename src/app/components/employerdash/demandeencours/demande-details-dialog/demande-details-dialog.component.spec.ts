import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDetailsDialogComponent } from './demande-details-dialog.component';

describe('DemandeDetailsDialogComponent', () => {
  let component: DemandeDetailsDialogComponent;
  let fixture: ComponentFixture<DemandeDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
