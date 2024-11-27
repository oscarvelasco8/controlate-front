import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetesPageComponent } from './diabetes-page.component';

describe('DiabetesPageComponent', () => {
  let component: DiabetesPageComponent;
  let fixture: ComponentFixture<DiabetesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiabetesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiabetesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
