import { TestBed } from '@angular/core/testing';

import { TasksResolver } from './tasks.resolver';

describe('TasksResolver', () => {
  let resolver: TasksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TasksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
