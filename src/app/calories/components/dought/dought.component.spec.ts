import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughtComponent } from './dought.component';

describe('DoughtComponent', () => {
  let component: DoughtComponent;
  let fixture: ComponentFixture<DoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoughtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
