import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodDiabetesComponent } from './search-food-diabetes.component';

describe('SearchFoodDiabetesComponent', () => {
  let component: SearchFoodDiabetesComponent;
  let fixture: ComponentFixture<SearchFoodDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFoodDiabetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFoodDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
