import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfoDiabetesComponent } from './food-info-diabetes.component';

describe('FoodInfoDiabetesComponent', () => {
  let component: FoodInfoDiabetesComponent;
  let fixture: ComponentFixture<FoodInfoDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodInfoDiabetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInfoDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
