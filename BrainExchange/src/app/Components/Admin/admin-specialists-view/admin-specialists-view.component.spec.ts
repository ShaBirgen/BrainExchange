import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpecialistsViewComponent } from './admin-specialists-view.component';

describe('AdminSpecialistsViewComponent', () => {
  let component: AdminSpecialistsViewComponent;
  let fixture: ComponentFixture<AdminSpecialistsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSpecialistsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSpecialistsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
