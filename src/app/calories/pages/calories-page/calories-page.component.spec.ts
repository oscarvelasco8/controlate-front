import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesPageComponent } from './calories-page.component';

describe('CaloriesPageComponent', () => {
  let component: CaloriesPageComponent;
  let fixture: ComponentFixture<CaloriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaloriesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
