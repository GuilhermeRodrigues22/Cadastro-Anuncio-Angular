import { TestBed } from '@angular/core/testing';

import { TransmissaoService } from './transmissao.service';

describe('TransmissaoService', () => {
  let service: TransmissaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransmissaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
