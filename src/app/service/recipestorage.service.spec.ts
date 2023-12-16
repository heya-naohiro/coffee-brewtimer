import { TestBed } from '@angular/core/testing';

import { RecipeStorageService } from './recipestorage.service';

describe('RecipeStorageService', () => {
  let service: RecipeStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
