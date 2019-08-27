import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryGplayAppsComponent } from './query-gplay-apps.component';

describe('QueryGplayAppsComponent', () => {
  let component: QueryGplayAppsComponent;
  let fixture: ComponentFixture<QueryGplayAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryGplayAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryGplayAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
