import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindGplayAppsComponent } from './find-gplay-apps.component';

describe('FindGplayAppsComponent', () => {
  let component: FindGplayAppsComponent;
  let fixture: ComponentFixture<FindGplayAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindGplayAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindGplayAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
