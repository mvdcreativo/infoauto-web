import { TestBed } from '@angular/core/testing';

import { GuiaPreciosService } from './guia-precios.service';

describe('GuiaPreciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuiaPreciosService = TestBed.get(GuiaPreciosService);
    expect(service).toBeTruthy();
  });
});
