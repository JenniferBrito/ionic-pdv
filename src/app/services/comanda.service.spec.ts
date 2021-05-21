/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComandaService } from './comanda.service';

describe('Service: Comanda', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComandaService]
    });
  });

  it('should ...', inject([ComandaService], (service: ComandaService) => {
    expect(service).toBeTruthy();
  }));
});
