import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaDeJuegosComponent } from './sala-de-juegos.component';

describe('SalaDeJuegosComponent', () => {
  let component: SalaDeJuegosComponent;
  let fixture: ComponentFixture<SalaDeJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaDeJuegosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaDeJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
