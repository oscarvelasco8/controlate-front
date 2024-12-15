import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarGraphicComponent } from './polar-graphic.component';

describe('PolarGraphicComponent', () => {
  let component: PolarGraphicComponent;
  let fixture: ComponentFixture<PolarGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolarGraphicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolarGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
