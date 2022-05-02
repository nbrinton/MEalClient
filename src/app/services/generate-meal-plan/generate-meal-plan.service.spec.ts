import { TestBed } from '@angular/core/testing';

import { GenerateMealPlanService } from './generate-meal-plan.service';

describe('GenerateMealPlanService', () => {
  let service: GenerateMealPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateMealPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
