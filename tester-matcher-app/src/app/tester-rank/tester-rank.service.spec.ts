import { TestBed } from '@angular/core/testing';

import { TesterRankService } from './tester-rank.service';

describe('TesterRankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TesterRankService = TestBed.get(TesterRankService);
    expect(service).toBeTruthy();
  });
});
