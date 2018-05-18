import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindingpathsComponent } from './windingpaths.component';

describe('WindingpathsComponent', () => {
  let component: WindingpathsComponent;
  let fixture: ComponentFixture<WindingpathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindingpathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindingpathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
