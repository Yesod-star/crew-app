import { TestBed } from '@angular/core/testing';

import { classRpgsService } from './classrpg.service';

describe('classrpgService', () => {
  let service: classRpgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(classRpgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
