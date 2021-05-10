import { TestBed } from '@angular/core/testing';

import { AnagramaService } from './anagrama.service';

describe('AnagramaService', () => {
  let service: AnagramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnagramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
