import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedraPapleOTijeraComponent } from './piedra-paple-o-tijera.component';

describe('PiedraPapleOTijeraComponent', () => {
  let component: PiedraPapleOTijeraComponent;
  let fixture: ComponentFixture<PiedraPapleOTijeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiedraPapleOTijeraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiedraPapleOTijeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
