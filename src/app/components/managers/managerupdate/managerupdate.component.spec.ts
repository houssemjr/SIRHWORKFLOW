import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerupdateComponent } from './managerupdate.component';

describe('ManagerupdateComponent', () => {
  let component: ManagerupdateComponent;
  let fixture: ComponentFixture<ManagerupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
