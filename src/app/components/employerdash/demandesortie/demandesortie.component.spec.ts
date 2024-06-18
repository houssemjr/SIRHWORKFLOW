import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesortieComponent } from './demandesortie.component';

describe('DemandesortieComponent', () => {
  let component: DemandesortieComponent;
  let fixture: ComponentFixture<DemandesortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandesortieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandesortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
