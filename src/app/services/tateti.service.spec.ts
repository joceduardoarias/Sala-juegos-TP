import { TestBed } from '@angular/core/testing';

import { TatetiService } from './tateti.service';

describe('TatetiService', () => {
  let service: TatetiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TatetiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
