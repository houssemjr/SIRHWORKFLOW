import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleajoutComponent } from './roleajout.component';

describe('RoleajoutComponent', () => {
  let component: RoleajoutComponent;
  let fixture: ComponentFixture<RoleajoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleajoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleajoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
