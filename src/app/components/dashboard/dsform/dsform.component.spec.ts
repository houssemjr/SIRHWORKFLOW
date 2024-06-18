import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsformComponent } from './dsform.component';

describe('DsformComponent', () => {
  let component: DsformComponent;
  let fixture: ComponentFixture<DsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
