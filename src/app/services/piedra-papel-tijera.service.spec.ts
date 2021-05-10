import { TestBed } from '@angular/core/testing';

import { PiedraPapelTijeraService } from './piedra-papel-tijera.service';

describe('PiedraPapelTijeraService', () => {
  let service: PiedraPapelTijeraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiedraPapelTijeraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
