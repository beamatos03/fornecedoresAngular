import { TestBed } from '@angular/core/testing';

import { fornecedorService } from './fornecedor.service';

describe('FornecedorService', () => {
  let service: fornecedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(fornecedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
