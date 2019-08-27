import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptAppsGplayComponent } from './script-apps-gplay.component';

describe('ScriptAppsGplayComponent', () => {
  let component: ScriptAppsGplayComponent;
  let fixture: ComponentFixture<ScriptAppsGplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptAppsGplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptAppsGplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
