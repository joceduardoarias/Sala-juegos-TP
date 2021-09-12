import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhoracadoComponent } from './ahoracado.component';

describe('AhoracadoComponent', () => {
  let component: AhoracadoComponent;
  let fixture: ComponentFixture<AhoracadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhoracadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhoracadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
