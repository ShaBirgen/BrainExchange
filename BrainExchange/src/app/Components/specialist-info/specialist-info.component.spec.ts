import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistInfoComponent } from './specialist-info.component';

describe('SpecialistInfoComponent', () => {
  let component: SpecialistInfoComponent;
  let fixture: ComponentFixture<SpecialistInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
