import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

describe('Employee', () => {
  let service: Employee;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Employee);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
