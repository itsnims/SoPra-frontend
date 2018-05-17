import { TestBed, inject } from '@angular/core/testing';

import { BlockadenService } from './blockaden.service';

describe('BlockadenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockadenService]
    });
  });

  it('should be created', inject([BlockadenService], (service: BlockadenService) => {
    expect(service).toBeTruthy();
  }));
});
