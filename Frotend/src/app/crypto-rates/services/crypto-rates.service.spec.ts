import { TestBed } from '@angular/core/testing';

import { CryptoRatesService } from './crypto-rates.service';

describe('CryptoRatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoRatesService = TestBed.get(CryptoRatesService);
    expect(service).toBeTruthy();
  });
});
