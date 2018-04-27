import { TestBed, inject } from '@angular/core/testing';

import { HandCardsServiceService } from './hand-cards-service.service';

describe('HandCardsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandCardsServiceService]
    });
  });

  it('should be created', inject([HandCardsServiceService], (service: HandCardsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
