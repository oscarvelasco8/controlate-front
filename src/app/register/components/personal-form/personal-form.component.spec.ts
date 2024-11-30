import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFormComponent } from './personal-form.component';

describe('PersonalComponent', () => {
  let component: PersonalFormComponent;
  let fixture: ComponentFixture<PersonalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
