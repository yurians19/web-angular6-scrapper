import { TestBed, inject } from '@angular/core/testing';

import { ScriptAppsGplayService } from './script-apps-gplay.service';

describe('ScriptAppsGplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptAppsGplayService]
    });
  });

  it('should be created', inject([ScriptAppsGplayService], (service: ScriptAppsGplayService) => {
    expect(service).toBeTruthy();
  }));
});
