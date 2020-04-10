import { TestBed } from '@angular/core/testing';

import { SettingApiService } from './setting-api.service';

describe('SettingApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingApiService = TestBed.get(SettingApiService);
    expect(service).toBeTruthy();
  });
});
