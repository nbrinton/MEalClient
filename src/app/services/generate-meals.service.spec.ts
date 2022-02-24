import { TestBed } from '@angular/core/testing';

import { GenerateMealsService } from './generate-meals.service';

describe('GenerateMealsService', () => {
  let service: GenerateMealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateMealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
