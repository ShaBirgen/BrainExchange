import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecialistViewComponent } from './user-specialist-view.component';

describe('UserSpecialistViewComponent', () => {
  let component: UserSpecialistViewComponent;
  let fixture: ComponentFixture<UserSpecialistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSpecialistViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSpecialistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
