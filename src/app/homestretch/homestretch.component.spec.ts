import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomestretchComponent } from './homestretch.component';

describe('HomestretchComponent', () => {
  let component: HomestretchComponent;
  let fixture: ComponentFixture<HomestretchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomestretchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomestretchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
